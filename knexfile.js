// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'test',
      user:     'root',
      password: ''
    },
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }


};
