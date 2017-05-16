'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'repos',
      'repo_score',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'repos',
      'repo_score'
    )
  }
};
