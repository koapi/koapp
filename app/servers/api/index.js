const { Koapi, logger, middlewares, config } = require('koapi')
const { connection } = require('../../models')
const { Storage } = require('../../models/file')
const { mailer, path } = require('../../lib/helper')

const app = new Koapi()

app.use(middlewares.preset('restful', config.get('servers.api.middlewares')))
app.use(middlewares.serve(path.storage('/public')))
app.use(require('./middlewares').before)
app.use(require('./routers'))
app.use(require('./middlewares').after)

async function teardown () {
  try {
    await require('../bull/queues').stop()
    await require('../schedulers').stop()
  } catch (e) {
    logger.error('Teardown Error:', e.message)
  }
  connection.destroy()
  // close nodemailer agent
  mailer().close()
  // close minio agent
  Storage.agent.destroy()
}

module.exports = {
  app,
  teardown,
  start (port = config.get('servers.api.port'), cb = null) {
    const server = app.listen(port, cb === null ? function () {
      logger.info(`Server is running on port ${this.address().port}`)
    } : cb)
    server.on('close', teardown)
    return server
  },
  stop () { app.server.close() }
}
require.main === module && module.exports.start()
