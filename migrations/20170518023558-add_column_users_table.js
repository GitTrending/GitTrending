'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'users',
        'displayName',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ), 
      queryInterface.addColumn(
        'users',
        'username',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ), 
      queryInterface.addColumn(
        'users',
        'profileUrl',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ]

  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'users',
        'displayName'
      ),
      queryInterface.removeColumn(
        'users',
        'username'
      ),
      queryInterface.removeColumn(
        'users',
        'profileUrl'
      ),
      queryInterface.removeColumn(
        'users',
        'email'
      )
    ]
  }
};
