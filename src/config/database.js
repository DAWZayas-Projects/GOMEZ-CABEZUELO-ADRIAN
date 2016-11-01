//config for sequelize cli


const specific = require('./config')

const config = {
  development: {
    username: specific.db.user,
    password: specific.db.password,
    database: specific.db.database,
    host: specific.db.host,
    dialect: specific.db.dialect,
  },
  production: {
    username: specific.db.user,
    password: specific.db.password,
    database: specific.db.database,
    host: specific.db.host,
    dialect: specific.db.dialect,
  }
}

module.exports = config
