const db = require('../models');

//Render the index as the first page that the user sees
const renderIndex = (req, res) => {
  res.render("index");
};

// we want to greet the user using their github name
const greetUser = (req, res) => {
    db.user.findOne({
        where: {
            name: id
        }
    });
};
// we want to display all repos to the "trending page" (&& display their keywords)
const displayRepos = (req, res) => {
    db.repo.findAll().then(data => {
        console.log(`The data is ${data}`);
        const hbsObject = {
            repos: data
        }
        res.render('trending', hbsObject);
    });
};

// we want to display repos associated with a specific Topic
// how will we handle user typing in more than one topic?
const queryRepoTopic = (req, res) => {
    const topic = req.body.searchTopic;
    console.log(`topic is ${topic}`);
    db.repo.findAll({
        where: {
            repo_name: topic
        }
    }).then(data => {
        const hbsObject = {
            repos: data
        }
        res.render('trending', hbsObject);
    });
};

module.exports = {
  renderIndex,
	greetUser,
	displayRepos,
	queryRepoTopic
}
