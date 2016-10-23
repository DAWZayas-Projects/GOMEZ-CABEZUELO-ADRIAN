import Config from './mysql';
import Sequelize from 'sequelize';


const sequelize = new Sequelize(Config.database, Config.user, Config.password, {
	        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
	        port:    3306, // or 5432 (for postgres)
	      });

sequelize
  .authenticate()
  .then(function(err) {
	      console.log('Connection has been established successfully.');
	    }, function (err) { 
		        console.log('Unable to connect to the database:', err);
		      });


export default sequelize;