'use strict';
/*
 * USER TABLE
*/

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable('users',
        {
          id: {
            type: Sequelize.INTEGER
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: Sequelize.STRING,
          password: Sequelize.STRING,
          id_google: Sequelize.STRING,
          photo: Sequelize.STRING,
          createdAt: {
          type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
        });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('users');
  }
};
