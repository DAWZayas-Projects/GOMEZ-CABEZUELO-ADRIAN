import Sequelize from 'sequelize';
import {sequelizeMysql as sequelize} from '../../config/sequelize';

export const User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING
});


export async function createUser(user) {
	return await User.create({
		username: user.username,
		password: user.password,
		email:    user.email
	});
}

export async function getAllUsers() {
	return await User.findAll({});
}

export async function findUserById(id) {
	return await User.findById(id);
}

export async function findUserByEmail(email) {
	return await User.findOne({
		where: { email: email }
	});
}

export async function updateUser(user) {
  return await Post.update({
                    username: user.username,
                    email:    user.email,
                    password: user.password
                  }, {
                    where: {
                      id: user.id
                    }
                });
}

export async function removeUser(id) {
    return await User.destroy({
                   where: {
                     id: id
                   }
                 });
}
