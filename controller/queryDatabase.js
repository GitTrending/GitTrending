'use strict';
const Promise = require('bluebird');
const db = require('../models');

// function to capitalize first letter of users Topic search for cohesive UI
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// render first page
const renderIndex = (req, res) => {
  res.render('index');
};

// we want to display a randomly selected trending topic when the user first lands
const displayRepos = (req, res) => {
  return Promise.all([
    db.topic.findAll({
      include: [db.repo],
      order: [[db.repo, 'repo_score', 'DESC']]
    }),
    db.user.findOne({
      where: {
        id: req.user.id
      }
    })
  ])
    .then(data => {
      const index = Math.round(Math.random() * (data[0].length - 1));
      const randomTopic = data[0][index];
      if (randomTopic.repos.length === 0) {
        console.log('I am running!!');
        const hbsObject = {
          data: true,
          topic: randomTopic.topic_name,
          noRepos: `There aren't any repos yet... why not add one!`,
          name: data[1].displayName
        };
        res.render('trending', hbsObject);
      } else {
        // the data returned is an array with 2 indices  -> [topicsData, userData]
        const hbsObject = {
          data: true,
          topic: randomTopic.topic_name,
          repos: randomTopic.repos,
          name: data[1].displayName
        };
        res.render('trending', hbsObject);
      }
    })
    .catch(err => {
      console.log(`error getting repos for a random topic>>> ${err}`);
    });
};

const noAuthdisplayRepos = (req, res) => {
  db.topic
    .findAll({
      include: [db.repo],
      order: [[db.repo, 'repo_score', 'DESC']]
    })
    .then(data => {
      console.log(`README: ${JSON.stringify(data)}`);
      // the data returned is an array with 2 indices  -> [topicsData, userData]
      const randomTopic =
        data[Math.round(Math.random() * (data.length - 1))];
      const hbsObject = {
        data: true,
        topic: randomTopic.topic_name,
        repos: randomTopic.repos
      };
      res.render('preview', hbsObject);
    })
    .catch(err => {
      console.log(`error getting repos for a random topic>>> ${err}`);
    });
};

// display repos associated with a queried Topic
const queryRepoTopic = (req, res) => {
  const topic = req.body.searchTopic;
  return Promise.all([
    db.topic.findOne({
      where: {
        topic_name: topic
      },
      include: [db.repo],
      order: [[db.repo, 'repo_score', 'DESC']]
    }),
    db.user.findOne({
      where: {
        id: req.user.id
      }
    })
  ])
    .then(data => {
      if (data[0] === null) {
        const hbsObject = {
          data: false,
          topic: topic.capitalize(),
          noTopic: `Oh, snap...`,
          addTopic: `${topic.capitalize()} doesn't exsist! Why not add it?`,
          name: data[1].displayName
        };
        res.render('firstAddTopic', hbsObject);
      }
      if (data[0].repos.length === 0) {
        const hbsObject = {
          data: true,
          topic: data[0].topic_name,
          noRepos: `There aren't any repos yet... why not add one!`,
          name: data[1].displayName
        };
        res.render('trending', hbsObject);
      } else {
        const hbsObject = {
          data: true,
          repos: data[0].repos,
          topic: topic.capitalize(),
          name: data[1].displayName
        };
        res.render('trending', hbsObject);
      }
    })
    .catch(err => {
      console.log(`err is ${err}`);
    });
};

const queryNoAuthRepoTopic = (req, res) => {
  const topic = req.body.searchTopic;
  db.topic
    .findOne({
      where: {
        topic_name: topic
      },
      include: [db.repo],
      order: [[db.repo, 'repo_score', 'DESC']]
    })
    .then(data => {
      const login = `<section id="button-section" class="flex justify-center items-center">
                            <div class="flex-column">
                                <a class="hvr-bubble-bottom code f3 grow no-underline br-pill ph3 pv2 mb2 dib
                                    washed-blue bg-black" href="/auth/github">Connect</a>
                            </div>
                        </section>`;
      if (data === null) {
        const hbsObject = {
          data: false,
          topic: topic.capitalize(),
          noTopic: `Oh, snap...`,
          addTopic: `${topic.capitalize()} doesn't exsist! Connect with Github to add this topic!`,
          login: login
        };
        res.render('noAuth', hbsObject);
      }
      if (data.repos.length === 0) {
        const hbsObject = {
          data: true,
          topic: data.topic_name,
          noRepos: `There aren't any repos yet... Connect with Github to add a repo!`,
          login: login
        };
        res.render('noAuth', hbsObject);
      } else {
        const hbsObject = {
          data: true,
          repos: data.repos,
          topic: topic.capitalize()
        };
        res.render('noAuth', hbsObject);
      }
    })
    .catch(err => {
      console.log(`err is ${err}`);
    });
};

module.exports = {
  renderIndex,
  displayRepos,
  noAuthdisplayRepos,
  queryRepoTopic,
  queryNoAuthRepoTopic
};
