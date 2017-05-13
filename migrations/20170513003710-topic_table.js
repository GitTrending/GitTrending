'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'topics',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        topic_name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
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
    return queryInterface.dropTable('topics');
  }
};
