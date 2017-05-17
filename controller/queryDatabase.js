'use strict';
const Promise = require('bluebird');

const db = require('../models');

//Render the index as the first page that the user sees
const renderIndex = (req, res) => {
    res.render("index");
};
// we want to greet the user using their github name
// we wtill need to get this working
const greetUser = (req, res) => {
    const userId = req.user.id;
    db.user.findOne({
        where: {
            id: userId
        }
    }).catch(err => {
        `err is ${err}`
    });
};

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// we want to display a randomly selected trending topic when the user first lands
const displayRepos = (req, res) => {
    db.topic.findAll({
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        }).then(data => {
            const randomTopic = data[Math.round(Math.random() * (data.length - 1))];
            console.log(`random topis is: ${randomTopic}`);
            console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[0]));
            const hbsObject = {
                data: true,
                topic: randomTopic.topic_name,
                repos: randomTopic.repos
            }
            console.log("This is the handlebar object " + JSON.stringify(hbsObject));
            res.render('trending', hbsObject)
        })
        .catch(err => {
            console.log(`error getting repos for a random topic>>> ${err}`)
        })
};

// we want to display repos associated with a specific Topic
// how will we handle user typing in more than one topic?
// we want to display repos associated with a specific Topic when searched

const queryRepoTopic = (req, res) => {
    const topic = req.body.searchTopic;
    console.log(topic);
    db.topic.findOne({
        where: {
            topic_name: topic
        },
        include: [db.repo],
        order: [
            [db.repo, 'repo_score', 'DESC']
        ]
    }).then(data => {
        console.log(`THE DATA IS: ${JSON.stringify(data)}`);
        if (data) {
            // here we need to handle how to check whether or not a search topic is in the DB
            // then add a similar message as below but saying "Topic not found, want to add it?"
            const hbsObject = {
                data: true,
                addRepoMessage: "Oh no...there doesn't seem to be any repos!! Why not add one?",
                repos: data.repos,
                topic: topic.capitalize()
            }
            console.log(`This is the HANDLEBAR ${JSON.stringify(hbsObject)}`);
            res.render('trending', hbsObject);
        } else {
            const hbsObject = {
                data: false,
                noTopic: "Oh no ${topic.capitalize()} isn't a topic yet! Why not add it below?",
                // repos: data.repos,
                // topic: topic.capitalize()
            }
            res.render('trending', hbsObject);
        }

    }).catch(err => {
        console.log(`err is ${err}`);
    });
};

// Users can add a topic.
const addTopic = (req, res) => {

    const addedTopic = req.body.addTopic;
    console.log(`added topic: ${addedTopic}`);

    const hbsObject = {
        topic: addedTopic.capitalize(),
        message1: "Oh no! There aren't any repos yet!",
        message2: "Want to add another repo?"
    };

    // Add new topic to database and render page.
    // Pass in the response, the added topic, and the handlebars object.
    const newTopic = createTopic(res, addedTopic, hbsObject);

};

// Add new topic to database and render page.
// Pass in the response, the added topic, and the handlebars object.
const createTopic = (res, addedTopic, hbsObject) => {
    db.topic.create({
        userId: 1,
        topic_name: addedTopic,
    }).then(data => {

        // Render addTopic page for the response.
        res.render('addTopic', hbsObject)
    }).catch(err => {
        `err is ${err}`
    });
};

// users can add a repo
const addRepo = (req, res) => {
    const repoLink = req.body.repoLink;
    const repoDesc = req.body.repoDesc;
    const topic = req.query.topic;
    return Promise.all([
        db.repo.create({
            userId: 1,
            repo_name: topic,
            repo_link: repoLink,
            repo_description: repoDesc
        }),
        db.topic.findOne({
            where: {
                topic_name: topic
            }
        })
    ]).then(data => {
        const repoId = data[0].id;
        const topicId = data[1].id;
        return db.repos_topics.create({
            repoId: repoId,
            topicId: topicId
        })
    }).then(data => {
        db.topic.findAll({
            where: {
                topic_name: topic
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        }).then(data => {
            console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[0]));
            const hbsObject = {
                data: true,
                topic: data[0].topic_name.capitalize(),
                repos: data[0].repos
            }
            console.log("This is the handlebar object " + JSON.stringify(hbsObject));
            res.render('trending', hbsObject)
        })
    }).catch(err => {
        `err is ${err}`
    });
}
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
    renderIndex,
    greetUser,
    displayRepos,
    queryRepoTopic,
    addTopic,
    addRepo,
    updateScore
};
