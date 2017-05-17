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
       order: [[db.repo, 'repo_score', 'DESC']]
    }).then(data => {
        const randomTopic = data[Math.round(Math.random()*(data.length-1))];
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
        include:[db.repo],
        order: [[db.repo, 'repo_score', 'DESC']]
    }).then(data => {
        console.log(`THE DATA IS: ${JSON.stringify(data)}`);
        if (data){
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
                noTopic:"Oh no ${topic.capitalize()} isn't a topic yet! Why not add it below?",
                // repos: data.repos,
                // topic: topic.capitalize()
            }
            res.render('trending', hbsObject);
        }

    }).catch(err => {
        console.log(`err is ${err}`);
    });
};
// users can add a topic
const addTopic = (req, res) => {
    const addedTopic = req.body.addTopic;
    console.log(`added topic: ${addedTopic}`);
    const hbsObject = {
        topic: addedTopic.capitalize(),
        message1: "Oh no! There aren't any repos yet!",
        message2: "Want to add another repo?"
    }
    db.topic.create({
        userId: 1,
        topic_name: addedTopic,
    }).then(data => {
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
            include:[db.repo],
            order: [[db.repo, 'repo_score', 'DESC']]
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

// We want to keep score based on user up and down votes.
// Still need to connect score to user.
// We shouldn't let user score up or down more than once in a row.
// Also, there's something strange happening with async.
// The score is updating correctly in the database, and will display with full refresh.
// But the callback functionality doesn't seem to pick up updated score
// When finding the repos for the topic again..
// I re-used similar approach to refreshing repos, and thought it would work.
// But there's something buggy in the refresh. I'd say Noel can fix this fast!
const updateScore = (req, res) => {
    const repo = req.params.id;

    const currentScore = parseInt(req.params.score);

    const updateValue = parseInt(req.body.scorechange);

    // We can remove these as part of cleaning up code.
    console.log("We are getting the repo!" + repo);
    console.log("Able to get current Score: " + currentScore);
    console.log("Able to get the value to change the score by: " + updateValue);
    
    // Update repo in repo table with new repo score.
    db.repo.update({
        repo_score: currentScore + updateValue
    }, {
        where: {
            id: repo
        }
    }).then(data => {
        db.topic.findAll({
            where: {
                topic_name: repo_name
            },
            include:[db.repo],
            order: [[db.repo, 'repo_score', 'DESC']]
        }).then(data => {
            const hbsObject = {
                data: true,
                topic: data[0].topic_name.capitalize(),
                repos: data[0].repos
            }
            res.render('trending', hbsObject)
        })
    }).catch(err => {
        `err is ${err}`
    });
};

module.exports = {
    renderIndex,
    greetUser,
    displayRepos,
    queryRepoTopic,
    addTopic,
    addRepo,
    updateScore
};