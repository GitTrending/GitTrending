const db = require('../models');

// we want to greet the user using their github name
const greetUser = (res, req) => {
    db._____.findOne({
        where: {
            name: _____
        }
    });
};
// we want to display all repos to the "trending page" (&& display their keywords)
const displayRepos = (res, req) => {
    db._____.findAll().then(data => {
        const hbsObject = {
            repos: data
        }
        res.render('index', hbsObject);
    });
};
// we want to display repos associated with a specific Topic
// how will we handle user typing in more than one topic? 
const queryRepoTopic = (res, req) => {
    db._____.findById().then(data => {
        const hbsObject = {
            repos: data
        }
        res.render('index', hbsObject);
    });
};

module.exports = {
	greetUser
	displayRepos
	queryRepoTopic
}