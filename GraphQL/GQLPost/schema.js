const {
  GraphQLObjectType
} = require('graphql');
const db = require('./db.js');

const person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a person',
  fields: () => {
    return {
      id: {
        type: GraphQLObjectType
      }
    } 
  }
});
