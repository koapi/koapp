const shelljs = require('shelljs')
const { addonArgs } = require('../lib/helper')

exports.default = {
  command: 'migrating [stuff]',
  describe: 'Migrating',
  builder: {
    stuff: {
      default: 'latest',
      choices: ['latest', 'setup', 'rollback', 'reset']
    }
  },
  handler: async argv => {
    let {stuff} = argv
    let args = addonArgs()
    switch (stuff) {
      case 'setup':
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        shelljs.exec('node --harmony `which knex` seed:run ' + args)
        break
      case 'rollback':
        shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
        break
      case 'reset':
        shelljs.exec('node --harmony `which knex` migrate:rollback ' + args)
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
        shelljs.exec('node --harmony `which knex` seed:run ' + args)
        break
      case 'latest':
      default:
        shelljs.exec('node --harmony `which knex` migrate:latest ' + args)
    }
  }
}
