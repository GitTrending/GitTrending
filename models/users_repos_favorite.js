'use strict';

module.exports = (sequelize, DataTypes) => {
  let UserRepoFavorite = sequelize.define('users_repos_favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    repoId: {
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'users_repos_favorite',
  });
  return UserRepoFavorite;
}
