const db = require('../models');

// we want to greet the user using their github name
const greetUser = (req, res) => {
    db.User.findOne({
        where: {
            name: id
        }
    });
};
// we want to display all repos to the "trending page" (&& display their keywords)
const displayRepos = (req, res) => {
    db.repo.findAll().then(data => {
        const hbsObject = {
            repos: data
        }
        res.render('trending', hbsObject);
    });
};

// we want to display repos associated with a specific Topic
// how will we handle user typing in more than one topic? 

// const queryRepoTopic = (res, req) => {
    // db.Topic.findById().then(data => {
    //     const hbsObject = {
    //         repos: data
    //     }
    //     res.render('trending', hbsObject);
    // });
// };

module.exports = {
	greetUser,
	displayRepos,
	// queryRepoTopic
}