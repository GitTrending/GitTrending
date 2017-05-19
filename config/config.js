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
    "username": "v72iat2r2bu59onq",
    "password": "o7bt87mhg04udarf",
    "database": "nwbf8796jdkrgbdq",
    "host": "gzp0u91edhmxszwf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
};

module.exports = 'production' || 'development'];
