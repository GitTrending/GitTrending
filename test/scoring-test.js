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

const repoScore = 0;

// Test repo scoring.
describe('Update repo score based on user input and display score', function() {
    
    // Test ability to upvote score if not already upvoted.
    it('shall upvote a repo score if not done already', async function() {

        // First find table and repo.
        const userReposFavorite = await db.users_repos_favorite.findOne({
            where: {
                userId: 1,
                repoId: 1
            }
        });

        const repo = await db.repo.findOne({
            where: {
                id: 1,
            }
        });

        // Test returns false with seed data.
        // Test returns true with user repo favorite table added.
        chai.expect(userReposFavorite.userId).to.equal(1)

        // Set to vote boolean value.
        const repoUserUpvoted = userReposFavorite.repo_upvoted;
        
        // Purposefully setting upvote score change to test results.
        const scoreChange = 1;

        // If user already upvoted, don't let them upvote again.
        if (repoUserUpvoted) {
            chai.expect(repoUserUpvoted).to.equal(true);
            return;

        // If user hasn't upvoted, test upvoting works.
        } else {
            chai.expect(repoUserUpvoted).to.equal(false);

            // Upvote repo score.
            await db.repo.update({
                repo_score: repo_score + scoreChange

            }, {
                where: {
                    id: 1,
                }
            });

            // Check repo score updated correctly.
            chai.expect(repo.repo_score).to.equal(repo.repo_score + 1);

            // Reset vote booleans.
            await db.users_repos_favorite.update({
                repo_upvoted:true,
                repo_downvoted: false
            }, {
                where: {
                    userId: 1,
                    repoId: 1
                }
            });

            // Test reset booleans works.
            chai.expect(repoUserUpvoted).to.equal(true);
        }
    });

    // Test ability to downvote score if not already upvoted.
    it('shall downvote a repo score if not done already', async function() {

        // First find table and repo.
       const userReposFavorite = await db.users_repos_favorite.findOne({
            where: {
                userId: 1,
                repoId: 2
            }
        });

        const repo = await db.repo.findOne({
            where: {
                id: 2,
            }
        });

        // Test returns false with seed data.
        // Test returns true with user repo favorite table added.
        chai.expect(userReposFavorite.userId).to.equal(1);
        
        // Set to vote boolean value.
        const repoUserDownvoted = userReposFavorite.repo_downvoted;

        // Purposefully setting upvote score change to test results.
        const scoreChange = -1;

        if (repoUserDownvoted) {
            chai.expect(repoUserDownvoted).to.equal(true);
            return;
        } else {
            chai.expect(repoUserDownvoted).to.equal(false);

            await db.repo.update({
                repo_score: repo_score + scoreChange

            }, {
                where: {
                    id: 2,
                }
            });

            // Check repo score updated correctly.
            chai.expect(repo.repo_score).to.equal(repo.repo_score - 1);

            await db.users_repos_favorite.update({
                repo_upvoted: false,
                repo_downvoted: true
            }, {
                where: {
                    userId: 1,
                    repoId: 2
                }
            });

            chai.expect(repoUserDownvoted).to.equal(true);

        }

    });

    // Todo: need to add test that score updates in View.
});
