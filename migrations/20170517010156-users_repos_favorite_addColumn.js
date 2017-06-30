'use strict';

const Promise = require('bluebird');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve();
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
