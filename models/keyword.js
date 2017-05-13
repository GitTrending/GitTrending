'use strict';

module.exports = (sequelize, DataTypes) => {
  let Keyword = sequelize.define('keyword', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    keyword_name: {
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
        Keyword.belongsTo(models.user, {
          foreignKey: {
            allowNull: false
          }
        });
      },
    },
  });
  return Keyword;
}
