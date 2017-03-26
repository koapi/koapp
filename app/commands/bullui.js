exports.default = {
  command: 'bullui',
  describe: 'Bull Queue Admin UI',
  builder: yargs => yargs.option('port', {
    alias: 'p',
    describe: 'Port',
    type: 'string'
  }),
  handler (argv) {
    const config = require('../config')
    let ui = require('bull-ui/app')({
      redis: {
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password
      }
    })

    ui.listen(argv.port || config.bull.ui_port, function () {
      console.log('Bull-UI started listening on port', this.address().port)
    })
  }
}
