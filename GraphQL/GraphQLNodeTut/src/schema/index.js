const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

// Define types here
const typeDefs = `
  type Song {
    id: ID!
    url: String!
    postedBy: User 
    mp3: String!
    votes: [Vote!]!
  }

  type User {
    id: ID!
    username: String! 
    email: String
    password: String
    votes: [Vote!]!
  }

  type Vote {
    id: ID!
    user: User!
    song: Song!
  }

  type Query {
    allSongs(filter: SongFilter, skip: Int, first: Int): [Song!]!
    allUsers: [User!]!
  }

  type Mutation {
    createSong(url: String!, user: String!, mp3: String!): Song
    createUser(username: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
    createVote(songId: ID!): Vote
  }

  type Subscription {
    Song(filter: SongSubscritionFilter): SongSubscriptionPayload
  } 

  input SongSubscritionFilter {
    mutaion_in: [_ModelMutationType!]
  }

  input SongFilter {
    OR: [SongFilter!]
    url_contains: String
  }
  
  type SongSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Song
  }

  enum _ModelMutationType {
    CREATED 
    UPDATED
    DELETED
  }
  
  type SigninPayload {
    token: String
    user: User
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
