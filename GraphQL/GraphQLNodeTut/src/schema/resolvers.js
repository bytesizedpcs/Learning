const { URL } = require('url');
const pubsub = require('../pubsub.js');

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

function assertValidSong({ url }) {
  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError('Song validation error: invalid url');
  }
}

function buildFilters({ OR = [], url_contains }) {
  const filter = url_contains ? {} : null;
  if (url_contains) {
    filter.url = { $regex: `.*${url_contains}.*` };
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildfilters(OR[i]));
  }

  return filters;
}

module.exports = {
  Query: {
    allSongs: async (root, { filter, first, skip }, { mongo: { Songs, Users } }) => {
      let query = filter ? { $or: buildFilters(filter) } : {};
      const cursor = Songs.find(query);

      if (first) { cursor.limit(first); }
      if (skip) { cursor.skip(skip); }
      return cursor.toArray(); 
    },

    allUsers: async (root, data, { mongo: { users } }) => {
      return await Users.find({}).toArray();
    },
  },

  Mutation: {
    createSong: async (root, data, { mongo: { Songs }, user }) => {
      assertValidSong(data);
      const newSong = Object.assign({ postedById: user && user._id }, data);
      const response = await Songs.insert(newSong);

      newSong.id = response.insertedIds[0];
      pubsub.publish('Song', { Song: { mutation: 'CREATED', node: newSong } });

      return Object.assign({ id: response.insertedIds[0] }, newSong);
    },

    createUser: async (root, data, { mongo: { Users } }) => {
      const newUser = {
        username: data.username,
        email: data.authProvider.email.email,
        password: data.authProvider.email.password,
      };
      const response = await Users.insert(newUser);
      return Object.assign({ id: response.insertedIds[0] }, newUser);
    },

    signinUser: async (root, data, { mongo: { Users } }) => {
      const user = await Users.findOne({ email: data.email.email });
      if (data.email.password === user.password) {
        return { 
          token: `token-${user.email}`,
          user
        };
      }
    }, 

    createVote: async (root, data, { mongo: { Votes }, user }) => {
      const newVote = {
        userId: user && user._id,
        songId: new ObjectID(data.linkId),
      };
      const response = await Votes.insert(newVote);
      return Object.assign({ id: response.insertedIds[0] }, newVote);
    },
  },

  Song: {
    id: root => root._id || root.id,
    postedBy: async ({ postedById }, data, { dataloaders: { userLoader } }) => {
      return await userLoader.load(postedById); 
    },
    votes: async ({ _id }, data, { mongo: { Votes } }) => {
      return await Votes.find({ linkId: _id }).toArray();
    }
  },

  User: {
    id: root => root._id || root.id,
    votes: async ({ _id }, data, { mongo: { Votes } }) => {
      return await Votes.find({ userId: _id }).toArray();
    },
  },

  Vote: {
    id: root => root._id || root.id,
    user: async ({ userId }, data, { dataloaders: { userLoader } }) => {
      return await userLoader.load(userId); 
    },
    song: async ({ songId }, data, { mongo: { Songs } }) => {
      return await Songs.findOne({ _id: songId });
    },
  },

  Subscription: {
    Song: {
      subscribe: () => pubsub.asyncIterator('Song'),
    }
  },
};
