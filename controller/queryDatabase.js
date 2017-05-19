'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Render the index as the first page that the user sees
// last bug for business logic
// we need to figure out why this page doesn;t render before being 
// prompted to sign into github
const renderIndex = (req, res) => {
    res.render("index");
};

// we want to display a randomly selected trending topic when the user first lands
const displayRepos = (req, res) => {
    return Promise.all([
    db.topic.findAll({
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        }),
    db.user.findOne({
        where: {
            id: req.user.id
        }
    }), 
    ]).then(data => {
        console.log(`README: ${JSON.stringify(data)}`);
        // the data returned is an array with 2 indices  -> [topicsData, userData]
        const index = Math.round(Math.random() * (data[0].length - 1));
        const randomTopic = data[0][index];
        const hbsObject = {
            data: true,
            topic: randomTopic.topic_name,
            repos: randomTopic.repos,
            name: data[1].displayName
        }
        res.render('trending', hbsObject)
    })
    .catch(err => {
        console.log(`error getting repos for a random topic>>> ${err}`)
    })
};

const noAuthdisplayRepos = (req, res) => {
    db.topic.findAll({
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        }).then(data => {
        console.log(`README: ${JSON.stringify(data)}`);
        // the data returned is an array with 2 indices  -> [topicsData, userData]
        const randomTopic = data[Math.round(Math.random() * (data.length - 1))];
        const hbsObject = {
            data: true,
            topic: randomTopic.topic_name,
            repos: randomTopic.repos
        }
        res.render('preview', hbsObject)
    })
    .catch(err => {
        console.log(`error getting repos for a random topic>>> ${err}`)
    })
};

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
        // the data returned is an object, the 'repos' property contains an array of repos. This array contains objects
        console.log(`THE DATA IS: ${JSON.stringify(data)}`);
        if (data) {
            const hbsObject = {
                data: true,
                addRepoMessage: "Oh no...there doesn't seem to be any repos!! Why not add one?",
                repos: data.repos,
                topic: topic.capitalize()
            }
            res.render('trending', hbsObject);
        } else {
            const hbsObject = {
                data: false,
                noTopic: `Oh no ${topic.capitalize()} isn't a topic yet! Why not add it below?`,
            }
            res.render('trending', hbsObject);
        }
    }).catch(err => {
        console.log(`err is ${err}`);
    });
};

module.exports = {
    renderIndex,
    displayRepos,
    noAuthdisplayRepos,
    queryRepoTopic,
};
