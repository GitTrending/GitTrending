const config = {
  "development": {
    "username": "root",
    "password": null,
    "database": "gitTrending_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "gittrendingtest_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];