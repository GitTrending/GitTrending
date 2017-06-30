'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve();
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
