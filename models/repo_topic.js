'use strict';

module.exports = (sequelize, DataTypes) => {
  let RepoTopic = sequelize.define('repos_topics', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    repoId: {
      type: DataTypes.INTEGER,
    },
    topicId: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'repos_topics',
  });
  return RepoTopic;
}

