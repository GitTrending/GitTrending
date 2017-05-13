'use strict';

const Promist = require('bluebird');
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable(
        'repos_topics',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          repoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'repos',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          topicId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'topics',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        }
      ), 
      queryInterface.createTable(
        'keywords_repos',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          repoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'repos',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          keywordId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'keywords',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        }
      ), 
      queryInterface.createTable(
        'keywords_topics',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          keywordId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'keywords',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
          topicId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'topics',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        }
      )
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('repos_topics'),
      queryInterface.dropTable('keywords_repos'),
      queryInterface.dropTable('keywords_topics'),
    ])
  },
};
