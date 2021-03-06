import Sequelize from 'sequelize'
import config from '../config/config'

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

})

export default sequelize
