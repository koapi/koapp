const { logger: log } = require('koapi')
exports.default = {
  command: 'server [name]',
  describe: 'run web server',
  builder: { name: { default: 'default' } },
  handler (argv) {
    log.info(`Using environment: ${process.env.NODE_ENV}`)
    const config = require(`../servers/${argv.name}/config`)
    const server = require(`../servers/${argv.name}`)
    server.start(config.port)
  }
}
