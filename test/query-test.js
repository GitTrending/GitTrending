/**
 * Testing all query database functions.
 */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// For testing http tasks.
chai.use(chaiHttp);

// Check index page renders successfully.
describe('Render /index route', function() {
    it('succeeds silently!', async function() {
        chai.request('http://localhost:8080')
        .get('/')
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });
});

// Check preview page renders with random topic when there's no oauth.
describe('Get repos for random topic when no oauth', function () {
    it('shall return that the ORM calls exist', function () {
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
        // This will always pass with seed data only.
        // It will pass with more than seed data, if random happens to be react.
        // I can adjust test later to loop through possible expections to cover all possibilities.
        chai.expect(topics[0].topic_name).to.equal('React');
        chai.expect(topics[0].repos[0].repo_name).to.equal('React');

        chai.request('http://localhost:8080')
        .get('/preview', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });
});

// Check repos associated with specific topic display when searched.
// Note: not checking user ids in these tests.
describe('Get repos for associated topic when searched', function() {
    
    // Test behavior where topic does not exist.
    it ('shall find topic does not exist', async function () {

        const topics = await db.topic.findOne({
            where: {
                topic_name: 'New topic'
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });

        const hbsObject = {
          noTopic: "Topic doesn't exist! Why not add it?"  
        };

        chai.expect(topics).to.equal(null);

        chai.request('http://localhost:8080')
        .get('/trending', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res.noTopic).to.equal("Topic doesn't exist! Why not add it?");
        });
    });

    // Test behavior where topic exists but no repos.
    it('shall find topic that exists with no repos', async function() {

        const topics = await db.topic.findOne({
            where: {
                topic_name: 'JavaScript'
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });

        const hbsObject = {
            topic: 'JavaScript',
            noRepos: "There aren't any repos yet..."
        };

        chai.expect(topics.topic_name).to.equal('JavaScript');
        chai.expect(topics.repos[0]).to.equal(undefined);

        chai.request('http://localhost:8080')
        .get('/trending', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res.noRepos).to.equal("There aren't any repos yet...");
        });
    });

    // Test behavior where topic exists with repos.
    it('shall find topic and repos', async function() {

        const topics = await db.topic.findOne({
            where: {
                topic_name: 'React'
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });

        const hbsObject = {
            topic: 'React',
            repos: topics.repos
        };

        chai.expect(topics.topic_name).to.equal('React');
        chai.expect(topics.repos[0].repo_name).to.equal('React');

        chai.request('http://localhost:8080')
        .get('/trending', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res.repos[0].repo_name).to.equal('React');
        });

    })
});



