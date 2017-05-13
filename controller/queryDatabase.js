const db = require('../models');

// we want to greet the user using their github name
const greetUser = (req, res) => {
    db.user.findOne({
        where: {
            name: id
        }
    }).catch(err => {
        `err is ${err}`
    });
};

// we want to display a randomly selected trending topic
const displayRepos = (req, res) => {
    // gives you all the topics with all of the repos
    console.log("req>>> is ", req.user.id);
    db.topic.findAll({
        where: {
            topic_name: 'React'
        },
        include: [db.repo]
    }).then(data => {
        console.log(`The data is ${JSON.stringify(data)}`);
        const hbsObject = {
            repos: data[0].repos,
            topic: data[0].topic_name
        }
        res.render('trending', hbsObject);
    }).catch(err => {
        `err is ${err}`
    });
};

// capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
// we want to display repos associated with a specific Topic
const queryRepoTopic = (req, res) => {
    const topic = req.body.searchTopic;
    db.repo.findAll({
        where: {
            repo_name: topic
        }
    }).then(data => {
        const hbsObject = {
            repos: data,
            topic: topic.capitalize()
        }
        res.render('trending', hbsObject);
    }).catch(err => {
        `err is ${err}`
    });
};
// add a topic
const addTopic = (req, res) => {
    const addedTopic = req.body.addTopic;
    console.log(`added topic: ${addedTopic}`);
    const hbsObject = {
        topic: addedTopic,
        message1: `There are no repos yet, want to add a repo?`,
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
// add a repo
const addRepo = (req, res) => {
    const repoLink = req.body.repoLink;
    const repoTopic = req.body.topic;
    // console.log(`the added repo specs: ${addedRepo}`);
    db.repo.create({
        // THIS USER ID WILL CHANGE
        userId: 1,
        repo_name: repoTopic,
        repo_link: repoLink,
    }).then(data => {
        console.log(`inserted repo data ${JSON.stringify(data)}`);
        db.repos_topics.create({
            repoId: data.id,
            topicId: 1
        }).then(data => {
            db.topic.findAll({
                where: {
                    id: 1
                },
                include: [db.repo]
            }).then(data => {
                const hbsObject = {
                    repos: data[0].repos,
                    topic: data[0].topic_name
                }
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
