'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'repos',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        repo_name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        repo_description:  {
          type: Sequelize.STRING,
          allowNull: true,
        },
        repo_link: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        repo_img: {
          type: Sequelize.STRING,
          allowNull: true,
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
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('repos');
  }
};
