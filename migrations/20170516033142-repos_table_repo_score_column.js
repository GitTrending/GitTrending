'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'repos',
      'repo_score',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'repos',
      'repo_score',
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    )
  }
};
