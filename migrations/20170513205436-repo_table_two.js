'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'repos',
      'repo_img'
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'repos',
      'repo_img',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },
};
