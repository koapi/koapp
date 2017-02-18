module.exports = {
  universal: { api: '/api', webpack_dev_server: true },
  port: 5000,
  database: {
    client: 'pg',
    debug: true,
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'koapp',
      charset: 'utf8'
    }
  }
}