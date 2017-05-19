/**
 * Testing all controller functions.
 */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// For testing http tasks.
chai.use(chaiHttp);

// Check that index page renders successfully.
describe('/index route', function() {
    it('succeeds silently!', async function() {
        chai.request('http://localhost:8080')
        .get('/')
        .end(function(err, res) {
            expect(res).to.have.status(200);
        });
    });
});

// 
describe('When no oauth, get repos for random topic', function () {
    const db = require('../models');

    it('exist', function () {
       chai.expect(db.topic.findAll).to.exist;
    });

    it('shall return a random topic on preview page', async function () {
        const topics = await db.topic.findAll({
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });
        const randomTopic = topics[Math.round(Math.random() * (topics.length - 1))];
        const hbsObject = {
                topic: randomTopic.topic_name,
                repos: randomTopic.repos
        }
        // Random tests are interesting.
        // This will pass with seed data only.
        // To get this to always or mostly pass,
        // I'd have a loop covering all topic names.
        chai.expect(topics[0].topic_name).to.equal('React');
        chai.expect(topics[0].repos[0].repo_name).to.equal('React');

        chai.request('http://localhost:8080')
        .get('/preview', hbsObject)
        .end(function(err, res) {
            expect(res).to.have.status(200);
        });
    });
});
