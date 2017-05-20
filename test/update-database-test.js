/**
 * Testing controller functions that update database.
 */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// For testing http tasks.
chai.use(chaiHttp);

// Need to test topic and repo capitalization.
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Add new topic.
// Test doesn't include user check.
// Issue created to handle user and Oauth tests at a later time.
describe('Add new topic and render add topic page', function () {

    it('shall add a new topic', async function () {

        // Add new topic to database.
        const addedTopic = await db.topic.create({
            userId: 1,
            topic_name: "progressive web apps"
        });

        const hbsObject = {
            topic: addedTopic.topic_name.capitalize(),
            message1: "Oh no! There aren't any repos yet!",
            message2: "Want to add another repo?",
        }

        // Check if topic added successfully and capitalization working.
        chai.expect(hbsObject.topic).to.equal('Progressive web apps');

        // Check add topic page renders.
        chai.request('http://localhost:8080')
        .get('/addTopic', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
        });
    });
});

// Add new repo to topic.
describe('Add new repo to existing topic', function() {
    
    it ('shall add a new repo to a topic', async function () {

        // Find table that we are adding repo to.
        const topic = await db.topic.findOne({
            where: {
                topic_name: "progressive web apps"
            }
        });

        // Add repo to database, linked to table.
        const addedRepo = await db.repo.create({
            userId: 1,
            repo_name: topic.topic_name,
            repo_link: 'https://github.com/pwarocks/pwa.rocks',
            repo_description: 'A selection of Progressive Web Apps'
        });

        // Test repo added successfully.
        chai.expect(addedRepo.repo_name).to.equal("progressive web apps");

        const topics = await db.topic.findAll({
            where: {
                topic_name: "progressive web apps"
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        });

        const hbsObject = {
            topic: topics[0].topic_name.capitalize(),
            repos: topics[0].repos
        }

        // Check trending page renders successfully after adding repo.
        chai.request('http://localhost:8080')
        .get('/trending', hbsObject)
        .end(function(err, res) {
            chai.expect(res).to.have.status(200);
            chai.expect(res.repos.repo_name).to.equal("Progressive web apps");
        });
    });
});
