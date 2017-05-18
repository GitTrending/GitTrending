'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

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
    greetUser,
    displayRepos,
    queryRepoTopic,
};
