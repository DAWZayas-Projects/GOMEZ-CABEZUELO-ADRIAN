import Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

export const User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING
});


export const createUser = async function createUser() {
	let sync = await User.sync({force: true});
	let user = await User.create({
		username: 'Pepe',
		password: 'password',
		email: 'pepe@gmail.com'
	});
	console.log(user.toJSON());
}


