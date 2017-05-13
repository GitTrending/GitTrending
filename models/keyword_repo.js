'use strict';

module.exports = (sequelize, DataTypes) => {
  let KeywordRepo = sequelize.define('keywords_repos', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    keywordId: {
      type: DataTypes.INTEGER,
    },
    repoId: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'keywords_repos',
  });
  return KeywordRepo;
}
