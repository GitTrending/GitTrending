'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// render first page
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
        })
    ]).then(data => {
        const index = Math.round(Math.random() * (data[0].length - 1));
        const randomTopic = data[0][index];
        if (randomTopic.repos.length === 0) {
            console.log('I am running!!');
            const hbsObject = {
                data: true,
                topic: randomTopic.topic_name,
                noRepos: `There aren't any repos yet... why not add one!`,
                name: data[1].displayName
            }
            res.render('trending', hbsObject);
        } else {
            // the data returned is an array with 2 indices  -> [topicsData, userData]
            const hbsObject = {
                data: true,
                topic: randomTopic.topic_name,
                repos: randomTopic.repos,
                name: data[1].displayName
            }
            res.render('trending', hbsObject);
         }
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
    return Promise.all([
        db.topic.findOne({
            where: {
                topic_name: topic
            },
            include: [db.repo],
            order: [
                [db.repo, 'repo_score', 'DESC']
            ]
        }),
        db.user.findOne({
            where: {
                id: req.user.id
            }
        })
    ]).then(data => {
        if (data[0] === null) {
            console.log('FIRST CONDITION');
            const hbsObject = {
                data: false,
                topic: topic.capitalize(),
                noTopic: `${topic.capitalize()} doesn't exsist! Why not add one?`,
                name: data[1].displayName
            }
            res.render('trending', hbsObject);
        }
        if (data[0].repos.length === 0) {
            console.log('I am running!!');
            const hbsObject = {
                data: true,
                topic: data[0].topic_name,
                noRepos: `There aren't any repos yet... why not add one!`,
                name: data[1].displayName
            }
            res.render('trending', hbsObject);
        } else {
            const hbsObject = {
                data: true,
                repos: data[0].repos,
                topic: topic.capitalize(),
                name: data[1].displayName
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
