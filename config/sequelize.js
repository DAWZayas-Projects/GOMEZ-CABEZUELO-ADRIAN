import Config from './mysql';
import Sequelize from 'sequelize';


export const sequelizeMysql = new Sequelize(Config.database, Config.user, Config.password, {
						        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
						        port:    3306, // or 5432 (for postgres)
						      });
export const conectDB = async function(sequelize) {
	return await sequelize
							  .authenticate()
							  .then(function(err) {
						      return 'Connection has been established successfully.';
						    }, function (err) {
					        return 'Unable to connect to the database: ' +  err;
					      });
}
