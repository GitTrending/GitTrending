# GitTrending
[![Build Status](https://travis-ci.org/GitTrending/GitTrending.svg?branch=master)](https://travis-ci.org/GitTrending/GitTrending)

This is an app the helps us organize GitHub repos.

Already in GitHub, people are manually creating lists in GitHub.
We wanted to create a tool to be able to do this quicker,
in a collaborative way, with better validation through scoring.

Note, the actual app is called GitLists (we own that GitHub repo name too).

Check it out here in heroku: [https://arcane-crag-98377.herokuapp.com/](https://arcane-crag-98377.herokuapp.com/)

We are starting to integrate with [travis](https://travis-ci.org/)
too, so we can keep track of things that might break our app!

## Add configuration files

To add configuration files that's been gitignored:

1. Go to `config` directory, and put in the relavent info (password, db name) in the `config.json` file. this will allow sequelize to connect with the database
2. In `config` directory, make an `auth.json` file similar to `auth.example.json` file, with KEY and SECRET sent out. 

## Initialize and migrate data

To populate tables and seed data, run below steps in the root of this repo:

1. install sequelize-cli globally if haven't done so `npm install sequelize-cli -g`
2. `mysql -u <user_name_usualy_root> -p < ./db/schema.sql`
3. if asked to run, run it `sequelize init`
4. `sequelize db:migrate` this will migrate(generate) ALL the new tables or seed data in the migration directory
5. `sequelize db:migrate:undo` this will revert ONE most recent migration. To remove all the migrations, you can keep running this command to eventually drop all the seed data and table
6. At early stage, it's possible to always `sequelize db:migrate:undo` to rollback to ground 0 with a clean table and/or db

