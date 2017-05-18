'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const updateScore = (req, res) => {
    const repoId = parseInt(req.params.repo_id);
    const topic = req.params.topic_name;
    const scoreChange = req.query.vote ==="up" ? 1: -1;
    let initialRepoScore;
    console.log("scoreChange is >>>>", scoreChange);
    console.log("topic is >>>", topic);
    console.log("repoId is>>>>", repoId);
    // first, find if the record is already favorite by the user
    return Promise.all([
        db.users_repos_favorite.findOne({
            where: {
                userId: req.user.id,
                repoId: repoId
            }
        }), 
        db.repo.findOne({
            where: {
                id: repoId,
            }
        })
    ])
    // then check if the user-repos-favorite already exist
    // create / update such record
    .then(data => {
        let userReposFavorite = data[0];
        let repoData = data[1];
        console.log("repoData is>>>>", repoData);
        initialRepoScore = repoData.repo_score;
        console.log("initialRepoScore>>>>",initialRepoScore)
        if (!userReposFavorite) {
            // if no such data
            // then create such data, with defaults
            let promise = [];
            if (scoreChange >=1) {
                promise.push(db.users_repos_favorite.create({
                    userId: req.user.id,
                    repoId: repoId,
                    repo_upvoted: true,
                    repo_downvoted: false,
                }) );
            } else {
                promise.push(db.users_repos_favorite.create({
                    userId: req.user.id,
                    repoId: repoId,
                    repo_upvoted: false,
                    repo_downvoted: true,
                }) );
            }
            promise.push(db.repo.update({
                repo_score: initialRepoScore + scoreChange
            }, {
                where: {
                    id: repoId,
                }
            }))
            return Promise.all(promise);
            
        } else {
            // if already such data, means user alread voted for this repo
            let repoUserUpvoted = userReposFavorite.repo_upvoted;
            let repoUserDownvoted = userReposFavorite.repo_downvoted;
            // scenario 1: already upvoted, still want to upvote
            // or already downvoted, still want to downvote
            if ( (repoUserUpvoted && scoreChange >=1) ||
                (repoUserDownvoted && scoreChange <=-1) ) {
                // then no db action......
                return Promise.resolve();
            } else {
                let promise =[];
                promise.push( db.repo.update({
                    repo_score: initialRepoScore + scoreChange
                }, {
                    where: {
                        id: repoId,
                    }
                }));
                if (scoreChange >=1) {
                    promise.push( db.users_repos_favorite.update({
                        repo_upvoted: true, 
                        repo_downvoted: false,
                    }, {
                        where: {
                            userId: req.user.id,
                            repoId: repoId
                        }
                    }) );
                }  else {
                    promise.push( db.users_repos_favorite.update({
                        repo_upvoted: false, 
                        repo_downvoted: true,
                    }, {
                        where: {
                            userId: req.user.id,
                            repoId: repoId
                        }
                    }) );
                }
                return Promise.all(promise);
            }
        }
    })
    // then fetch all the updated repo
    .then(() => {
        console.log("updating scoring ");
        return db.topic.findAll({
            where: {
                topic_name: topic
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        })
    })
    .then(data => {
        const hbsObject = {
            data: true,
            topic: data[0].topic_name.capitalize(),
            repos: data[0].repos
        }
        res.render('trending', hbsObject)
    })
    .catch(err=>{
        console.log("something went wrong updating score>>>>", err);
    });
}

module.exports = {
  updateScore  
}