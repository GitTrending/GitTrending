const config = {
  // "development": {
  //   "username": "root",
  //   "password": null,
  //   "database": "gitTrending_db",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "gittrendingtest_db",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  "production": {
    "username": "rpf6cvu92wulobtp",
    "password": "j9ly9sfl9b4je647",
    "database": "yd9lprtxx3hjf329",
    "host": "s54ham9zz83czkff.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
};

// if (process.ENV === 'production') {
  module.exports = config;	
// } else if (process.ENV === 'test') {
//   module.exports = config.test;
// } else if (process.ENV === 'development') {
//   module.exports = config.development;
// }
