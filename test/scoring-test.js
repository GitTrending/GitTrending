/**
 * Testing the mega update score function.
 */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// For testing http tasks.
chai.use(chaiHttp);

// Test repo scoring.
describe('Update repo score based on user input and display score', function () {
    it('shall update score when user already has favorited a repo', async function () {
       
       const userReposFavorite = await db.users_repos_favorite.findOne({
            where: {
                userId: 1
                repoId: 1
            }
        });

        const repo = await db.repo.findOne({
            where: {
                id: 1,
            }
        });

        // We are testing behavior when user already has favorite for a repo.
        // User id of repo and repo favorite match based on find.
        // So knowing repo exists means we can move on in tests.
        if (userReposFavorite.userId === 1) {

            const repoUserUpvoted = userReposFavorite.repo_upvoted;
            const scoreChange = 1;

            if (repoUserUpvoted && scoreChange === 1) {
                db.repo.update({
                    repo_score: repo_score + scoreChange
                }, {
                    where: {
                        repo.id: 1,
                    }
                });
                db.users_repos_favorite.update({
                    repo_updated:true,
                    repo_downvoted: false
                });
                chai.expect(repo.repo_score).to.equal(repo.repo_score + 1);
                chai.expect(userReposFavorite)
            } else if (repoUserDownvoted && scoreChange === -1) {
                chai.expect(repo.repo_score).to.equal(repo.repo_score - 1);
            }

        }
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
             chai.expect(res.repos[0].repo_name).to.equal("React");
        });

    })
});



