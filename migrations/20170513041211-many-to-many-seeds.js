'use strict';

const Promist = require('bluebird');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('repos_topics',[
        {
          repoId: 1,
          topicId: 1,
        },
      ]),
      queryInterface.bulkInsert('keywords_repos',[
        {
          keywordId: 1,
          repoId: 1,
        },
      ]), 
      queryInterface.bulkInsert('keywords_topics',[
        {
          keywordId: 1,
          topicId: 1,
        },
      ]), 
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('repos_topics', 
        [{id:1}]
      ),
      queryInterface.bulkDelete('keywords_repos', 
        [{id:1}]
      ),
      queryInterface.bulkDelete('keywords_topics', 
        [{id:1}]
      ),
    ])
  },
};
