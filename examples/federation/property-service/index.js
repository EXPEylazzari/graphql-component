'use strict';

const { ApolloServer } = require('apollo-server');
const GraphQLComponent = require('../../../lib');
const PropertyDataSource = require('./datasource');
const resolvers = require('./resolvers');
const types = require('./types');
const mocks = require('./mocks');

class PropertyComponent extends GraphQLComponent {
  constructor({ dataSources = [new PropertyDataSource()], ...options } = {}) {
    super({ types, resolvers, mocks, dataSources, ...options, federation: true });
  }
}

const startPropertyService = async () => {
  const { schema, context } = new PropertyComponent();

  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    subscriptions: false,
    playground: false
  });

  const { url } = await server.listen({port: 4001});
  console.log(`🚀 property service ready at ${url}`);
}

module.exports = startPropertyService;


