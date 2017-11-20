const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const GRAPHQL_PORT = 4000;
app.listen(GRAPHQL_PORT);
console.log(`Listening on ${GRAPHQL_PORT}...`);
