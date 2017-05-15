'use strict';

const Promise = require('bluebird');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users',[
      {
        github_id: 'John.Doe',
      },
      {
        github_id: 'Jane.Doe',
      },
    ])
    .then(()=> {
      return Promise.all([
        queryInterface.bulkInsert('repos',[
          {
            repo_name: 'React',
            repo_description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces',
            repo_link: 'https://github.com/facebook/react',
            repo_score: 1,
            userId: 1
          },
        ]), 
        queryInterface.bulkInsert('topics',[
          {
            topic_name: 'React',
            userId: 1
          },
        ]),
        queryInterface.bulkInsert('keywords',[
          {
            keyword_name: 'JavaScript',
            userId: 1
          },
        ]), 
      ])
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', 
      { github_id: 
        {
          $in: 
          [
            'John.Doe',
            'Jane.Doe',
          ]
        }
      }, 
      {}, 
      {primaryKeys:[],primaryKeyAttributes:[]}
    );
  }
};
