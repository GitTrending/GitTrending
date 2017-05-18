/**
 * Service around @{Topic}
 *
 * @module node-sequelize-with-mocks/topic/service
 * @exports TopicService
 */

'use strict';

// Imports
const Topic = require('./model');


class TopicService {
    /**
     * returns topics
     */
    static findAll() {
        return Topic.findAll({
            'raw': true
        });
    }

    /**
     * returns topioc
     */
    static find(topicId) {
        return Topic.findById(topicId);
    }
}

module.exports = TopicService;

