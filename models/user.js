import Sequelize from 'sequelize';
import sequelize from '../config/sequelize';

export const User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING
});


export const createUser = async function createUser() {
	const user = await User.create({
		username: 'Pepe',
		password: 'password',
		email: 'pepe@gmail.com'
	});
	console.log(user);
}


export const findUserById = async function findUserById(id) {
	const user = await User.findById(id);
	console.log(user);
}