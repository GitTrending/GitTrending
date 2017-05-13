'use strict';

module.exports = (sequelize, DataTypes) => {
  let KeywordTopic = sequelize.define('keywords_topics', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    keywordId: {
      type: DataTypes.INTEGER,
    },
    topicId: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'keywords_topics',
  });
  return KeywordTopic;
}

