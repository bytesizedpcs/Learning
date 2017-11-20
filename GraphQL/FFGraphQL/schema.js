const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString)
const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

function fetchStuff() {
  return fetch('https://www.goodreads.com/author/show.xml?id=4432&key=risKm8wwXsIcyEiTktvA')
    .then(response => response.text())
    .then(parseXML)
    .catch(error => console.error(error));
}

fetchStuff();

let newFunction = () => {

}

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString    
    } 
  })
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => fetchStuff() 
      }
    })
  })
});
