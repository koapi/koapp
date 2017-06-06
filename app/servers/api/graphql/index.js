const { graphql: { types, Loader } } = require('koapi')
const query = require('./query')
const mutation = require('./mutation')

module.exports = ctx => ({
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
  context: {
    loader: new Loader(),
    user: ctx.state.user
  }
  // formatError: e => {
  //   logger.error(e)
  //   return e
  // }
})