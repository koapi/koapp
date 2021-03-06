const { graphql: { types, Loader }, logger } = require('koapi')
const query = require('./query')
const mutation = require('./mutation')

module.exports = {
  schema: new types.Schema({
    query: new types.Object({
      name: 'Query',
      fields: query
    }),
    mutation: new types.Object({
      name: 'Mutation',
      fields: mutation
    })
  }),
  context: ({ ctx }) => ({
    loader: new Loader(),
    user: ctx.state.user,
    state: {}
  }),
  formatError: e => {
    logger.error(e)
    return e
  }
}
