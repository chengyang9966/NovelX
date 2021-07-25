module.exports = {
    HOST: process.env.HEROKU_POSTGRESQL_HOST,
    USER: process.env.HEROKU_POSTGRESQL_USER,
    PASSWORD: process.env.HEROKU_POSTGRESQL_PASSWORD,
    DB: process.env.HEROKU_POSTGRESQL_DATABASE,
    dialect: "postgresql",
    listen_addresses: '*',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };