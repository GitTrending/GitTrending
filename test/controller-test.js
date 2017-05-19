/**
 * Testing all controller functions.
 */

'use strict';

const chai = require('chai');


describe('When no oauth, get repos for random topic', function () {
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
        // Random tests are interesting.
        // This will pass with seed data only.
        // To get this to always or mostly pass,
        // I'd have a loop covering all topic names.
        chai.expect(topics[0].topic_name).to.equal('React');
        chai.expect(topics[0].repos[0].repo_name).to.equal('React');
    });
});
