const Queue = require('bull')
const { logger: log, config } = require('koapi')
const { mailer } = require('../../lib/helper')
const Joi = require('joi')
const schema = Joi.object().keys({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  from: Joi.string().email(),
  text: Joi.string(),
  html: Joi.string()
}).or('text', 'html')

exports.queue = new Queue('Mailer', config.get('redis.port'), config.get('redis.host'))
exports.queue.on('error', log.error)
exports.default = {
  name: 'Mailer',
  queue: exports.queue,
  async worker (job) {
    log.info('Job received', job.id)
    const valid = Joi.validate(job.data, schema)
    if (valid.error) throw new Error(valid.error)
    log.info('EMail sending...')
    const result = await mailer().sendMail(job.data)
    log.info('EMail sent to %s, messageId: %s', job.data.to, result.messageId)
  }
}
