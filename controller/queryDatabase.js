'use strict';
const db = require('../models');
// we want to greet the user using their github name
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

// we want to display a randomly selected trending topic
const displayRepos = (req, res) => {
    // gives you all the React repos to start user off
    db.repo.findAll({
    // gives you all the topics with all of the repos
    //console.log("req>>> is ", req.user.id);
        where: {
            repo_name: 'react'
        },
    }).then(data => {
        console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[0]));
        const hbsObject = {
            topic: 'React',
            repos: data
        }
        console.log("This is the handlebar object " + JSON.stringify(hbsObject));
        res.render('trending', hbsObject)
    })
};

// we want to display repos associated with a specific Topic when searched
const queryRepoTopic = (req, res) => {
    const topic = req.body.searchTopic;
    db.repo.findAll({
        where: {
            repo_name: topic
        }
    }).then(data => {
        // here we need to handle how to check whether or not a search topic is in the DB
        // then add a similar message as below but saying "Topic not found, want to add it?"
        const hbsObject = {
            addRepoMessage: "Oh no...there doesn't seem to be any repos!! Why not add one?",
            repos: data,
            topic: topic.capitalize()
        }
        res.render('trending', hbsObject);
    }).catch(err => {
        `err is ${err}`
    });
};
// users can add a topic
const addTopic = (req, res) => {
    const addedTopic = req.body.addTopic;
    console.log(`added topic: ${addedTopic}`);
    const hbsObject = {
        topic: addedTopic.capitalize(),
        message1: `Oh no! There aren't any repos yet!`,
        message2: `Want to add another repo?`
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
    const repo_name = req.query.topic;
    console.log(repo_name);
    db.repo.create({
        userId: 1,
        repo_name: repo_name,
        repo_link: repoLink,
    }).then(data => {
        db.repos_topics.create({
            repoId: data.id,
            topicId: 1
        }).then(data => {
            db.repo.findAll({
                where: {
                    repo_name: repo_name
                },
            }).then(data => {
                console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[0]));
                const hbsObject = {
                    topic: repo_name.capitalize(),
                    repos: data
                }
                console.log("This is the handlebar object " + JSON.stringify(hbsObject));
                res.render('trending', hbsObject)
            })
        }).catch(err => {
            `err is ${err}`
        });
    });
}

module.exports = {
    greetUser,
    displayRepos,
    queryRepoTopic,
    addTopic,
    addRepo
};