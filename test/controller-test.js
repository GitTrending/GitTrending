/**
 * Testing all controller functions.
 */

'use strict';

const chai = require('chai');


describe('Find all topics', function () {
    const db = require('../models');

    it('exist', function () {
       chai.expect(db.topic.findAll).to.exist;
    });

    it('shall return a random', async function () {
        const topics = await db.topic.findAll({
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });
        // This will fail on purpose since we are looking for random.
        chai.expect(topics).deep.equals([{
            "id": 1,
            "topic_name": "JavaScript"
        }]);
    });
});
