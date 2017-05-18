/**
 * Run the application
 *
 * @module node-sequelize-with-mocks/index
 */

'use strict';

// Imports
const TopicService = require('./topic/service');

// Run
console.log('Fetch the topics');

TopicService
    .findAll()
    .then(function (topics) {
        console.dir(topics);
    })
    .catch(function (err) {
        console.error(err && err.stack ?  err.stack : err);
    });
