'use strict';

import sequelize from '../lib/sequelize';
import log4js from 'log4js';
import Sequelize from 'sequelize'
import User from './user'
import moment from 'moment'

const LOG = log4js.getLogger('file');

let History = sequelize.define('histories', {
  host: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  root: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});


History.createNewFtpHistory = async (ftp, userId) => {
  return await History.sync().then(function () {
                  // Table created
      return History.create({
                    userId: userId,
                    host:   ftp.host,
                    user:   ftp.user,
                    action: ftp.action,
                    root:   ftp.root,
                })
  })
}

History.getAllForThisMonth = async (userId) => {
  const today = moment(moment(), 'YYYY-MM-DDTHH:mm:ss UTC');
  const day                   = today.get('date')
  const firstDateOfThisMonth  = today.clone().subtract(day - 1, 'days')

  return await History.findAll({
                where: {
                  userId: userId,
                  date: {
                    gt: firstDateOfThisMonth,
                    lte: today,  
                  },
                }
              }).then(histories => {
                return histories
              })
}

export default History
