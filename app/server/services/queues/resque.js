const {default: log} = require('koapi/lib/logger')
const { queue: Queue, worker: Worker } = require('node-resque')
const config = require('../../../../config/server')

const jobs = {
  mailer: {
    perform (msg, cb) {
      log.info('RESQUE: msg received, %s', JSON.stringify(msg))
      cb(null, 'received')
    }
  }
}

const instance = new Queue({ connection: config.redis }, jobs)
instance.on('error', log.error)
instance.connect(a => a)

const worker = exports.worker = new Worker({ connection: config.redis, queues: '*' }, jobs)

exports.queue = {
  enqueue (func, msg, q = '*') {
    return new Promise(async (resolve, reject) => {
      if (!instance.connection.connected) {
        await new Promise((resolve, reject) => {
          instance.connect(resolve)
        })
      }
      if (!instance.connection.connected) {
        return reject('resque connect failed!')
      }
      instance.enqueue(q, func, msg, e => (e ? reject(e) : resolve()))
    })
  }
}

exports.default = async function () {
  return new Promise((resolve, reject) => {
    worker.on('error', log.error)
    worker.connect(() => {
      worker.workerCleanup()
      worker.start()
      log.info('Queue resque ready for jobs, PID: %s', process.pid)
      resolve()
    })
  })
}