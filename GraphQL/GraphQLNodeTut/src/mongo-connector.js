const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/musicshare';

module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL);
  return { 
    Songs: db.collection('songs'),
    Users: db.collection('users'), 
    Votes: db.collection('votes'),
  };
}
