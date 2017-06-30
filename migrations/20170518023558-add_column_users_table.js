'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve();
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
