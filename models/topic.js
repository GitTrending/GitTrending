'use strict';

module.exports = (sequelize, DataTypes) => {
  let Topic = sequelize.define('topic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    topic_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  }, 
  {
    timestamps: false,
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        // An Author (foreignKey) is required or a Post can't be made
        Topic.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
        Topic.belongsToMany(models.repo, {
          through: {
            model: models.repos_topics,
            unique: false,
          },
          foreignKey: 'topicId',
          constraints: false
        });
        //Topic.hasMany(models.repo);
        Topic.belongsToMany(models.keyword, {
          through: {
            model: models.keywords_topics,
            unique: false,
          },
          foreignKey: 'topicId',
          constraints: false
        });
        //Topic.hasMany(models.keyword);
      },
    },
  });
  return Topic;
}
