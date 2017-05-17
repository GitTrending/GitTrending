'use strict';

const Promise = require('bluebird');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'users_repos_favorite',
        'repo_upvoted',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue:false
        }
      ), 
      queryInterface.addColumn(
        'users_repos_favorite',
        'repo_downvoted',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue:false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'users_repos_favorite',
        'repo_upvoted'
      ), 
      queryInterface.removeColumn(
        'users_repos_favorite',
        'repo_downvoted'
      )
    ];
  }
};
