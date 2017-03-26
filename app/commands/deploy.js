const shelljs = require('shelljs')

exports.default = {
  command: 'deploy [task]',
  describe: 'Example',
  builder: {
    task: {
      default: 'setup',
      choices: ['setup', 'upgrade', 'rollback']
    }
  },
  async handler (argv) {
    shelljs.exec(`fly ${argv.task}:deployment`)
  }
}
