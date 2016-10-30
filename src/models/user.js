'use strict';

import sequelize from '../lib/sequelize';
import log4js from 'log4js';
import Sequelize from 'sequelize'

const LOG = log4js.getLogger('file');

let User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {

      len: [2, 40]
    },
  },
  email: {//when take email from google was implement {unique: true}
      type: Sequelize.STRING,
      allowNull: true, // if logging with google i dont have this
      validate: {
        isEmail: true
      },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true, // if logging with google i dont have this
    validate: {
      is: /^[a-zA-Z0-9_.-]*$/i,
      len: [2, 20]
    },
  },
  id_google: {
    type: Sequelize.STRING,
    allowNull: true, // if not logging with google is null
    unique: true,
  },
  photo: {
    type: Sequelize.STRING,
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


User.findOneByUserName = async (name) => {
  return await User.findOne({
    where: {name: name},
  }).then(function(user) {
    return user
  })
}

User.findByGoogleStrategy = async (user) => {
  // retrieve user ...
  LOG.warn(JSON.stringify({
      'user------------' : user
  }))
  return await User
                .findOrCreate({where: {id_google: user.id}, defaults: {name: user.displayName, photo: user.photos[0].value} })
                .spread(function(user, created) {
                  return user;
                })
}



User.verify = async function(username, password) {

    let user = await User.findOneByUserName(username)

    LOG.warn(JSON.stringify({
        'user' : user,
    }))

    if(user !== null && (user.dataValues.password === password) && (user.name === username)) {
        return user
    } else {
        return null;
    }

}

export default User;
