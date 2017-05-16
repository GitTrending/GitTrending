'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users_repos_favorite',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'users',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        repoId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'repos',
              key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users_repos_favorite');
  }
};

