/**
 * Define the database model around a @{Topic}
 *
 * @module node-sequelize-with-mocks/user/model
 * @exports Sequelize.Model
 */

'use strict';

// Imports
const Database = require('../database');

// Model definition

const Topic = Database 
    .getInstance()
    .define('topic', {
        'id': {
            'type': Database.FIELD_TYPE_ENUM.INTEGER,
            'autoIncrement': true,
            'primaryKey': true
        },
        'topic_name':  {
            'type': Database.FIELD_TYPE_ENUM.STRING,
            'allowNull': false
        }
    });


module.exports = Topic;

