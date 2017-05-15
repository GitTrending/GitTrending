'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const db = require('../models');
// we want to greet the user using their github name
const greetUser = (req, res) => {
    const userId = req.user.id;
    db.user.findOne({
        where: {
            id: userId
        }
    })
    .then(user => user.toJSON())
    .catch(err => {
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
    db.repo.findAll({})
    .then(data => {
        let selectedRepo = data[Math.round(Math.random()*(data.length-1))];
        console.log("This is the data when you find all after adding a repo: " + JSON.stringify(selectedRepo));
        const hbsObject = {
            topic: 'React',
            repos: selectedRepo[0]
        }
        console.log("This is the handlebar object " + JSON.stringify(hbsObject));
        res.render('trending', hbsObject)
    })
    .catch(err =>{
        console.log("encountered an error fetching repos")
    })
};

// we want to display repos associated with a specific Topic when searched
const queryRepoTopic = (req, res) => {
    const topic = req.body.searchTopic;
    db.topic.findAll( {
        where: {
            topic_name: topic,
        },
        include: [db.repo]
    })
    .then(data => {
        const topicWithRelatedRepos = data[0];
        const repos = topicWithRelatedRepos.repos;
        const hbsObject = {
            addRepoMessage: "Oh no...there doesn't seem to be any repos!! Why not add one?",
            repos: repos,
            topic: topic.capitalize()
        };
        res.render('trending', hbsObject);
    })
    .catch(err => {
        console.log(`error getting repos with selected topic >>> ${err}`);
    })
};

// users can add a topic
const addTopic = (req, res) => {
    const addedTopic = req.body.addTopic;
    const gitHubUserId = _.get(req, 'session.passport.user', null);
    console.log("req user is >>>", req.session.passport.user);
    console.log(`added topic: ${addedTopic}`);
    const hbsObject = {
        topic: addedTopic.capitalize(),
        message1: `Oh no! There aren't any repos yet!`,
        message2: `Want to add another repo?`
    }
    db.user.findOne({where: {github_id: gitHubUserId}})
    .then(data=>{
        const user_id = data.id;
        return db.topic.create({
            userId: user_id,
            topic_name: addedTopic,
        })
    })
    .then(data => {
        res.render('addTopic', hbsObject)
    }).catch(err => {
        console.log(`err adding topics >>> ${err}`);
    });
};

// users can add a repo 
const addRepo = (req, res) => {
    const repoLink = req.body.repoLink;
    const topic = req.query.topic;
    const repo_name = topic;
    console.log("current topics is >>>>", topic);
    const gitHubUserId = _.get(req, 'session.passport.user', null);
    db.user.findOne({where: {github_id: gitHubUserId}})
    // then create repo in repo table
    .then(data => {
        const user_id = data.id;
        return Promise.all([
            db.repo.create({
                userId: user_id,
                repo_name: repo_name,
                repo_link: repoLink,
            }),
            db.topic.findOne({
                where:{
                    topic_name: topic
                }
            })
        ])
    })
    // then create the repo with current topic in repos-topics join table
   .then(data => {
        const repoId = data[0].id;
        const topicId = data[1].id;
        return db.repos_topics.create({
            repoId: repoId,
            topicId: topicId
        })
    })
    // then display all the repo 
    .then(data => {
        return db.repo.findAll({
            where: {
                repo_name: repo_name
            },
        })
    })
    .then(data => {
        console.log("This is the data when you find all after adding a repo: " + JSON.stringify(data[0]));
        const hbsObject = {
            topic: repo_name.capitalize(),
            repos: data
        }
        console.log("This is the handlebar object " + JSON.stringify(hbsObject));
        res.render('trending', hbsObject)
    }) 
    .catch(err => {
        console.log(`error adding repo or linking it with a topic >>> ${err}`);
    });
}

module.exports = {
    greetUser,
    displayRepos,
    queryRepoTopic,
    addTopic,
    addRepo
};
