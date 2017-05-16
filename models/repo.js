'use strict';

module.exports = (sequelize, DataTypes) => {
  let Repo = sequelize.define('repo', {
    id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
    },
    repo_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    repo_description:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    repo_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, 
  {
    timestamps: false,
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        // An Author (foreignKey) is required or a Post can't be made
        Repo.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
        Repo.belongsToMany(models.topic, {
          through: {
            model: models.repos_topics,
            unique: false,
          },
          foreignKey: 'repoId',
          constraints: false
        });
        //Repo.hasMany(models.topic);
        Repo.belongsToMany(models.keyword, {
          through: {
            model: models.keywords_repos,
            unique: false,
          },
          foreignKey: 'repoId',
          constraints: false
        });
        Repo.belongsToMany(models.user, {
          through: {
            model: models.users_repos_favorite,
            unique: false,
          },
          foreignKey: 'repoId',
          constraints: false
        });
        //Repo.hasMany(models.keyword);
      },
    },
  });
  return Repo;
}
