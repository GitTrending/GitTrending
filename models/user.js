module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    github_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      timestamps: false,
      // We're saying that we want our burger to have one customer.
      classMethods: {
        associate: function(models) {
          // Associating Burger with Customer.
          // When a Burger is deleted, set the customer to null.
          User.hasMany(models.repo, {
            onDelete: "cascade"
          });
          User.hasMany(models.topic, {
            onDelete: "cascade"
          });
          User.hasMany(models.keyword, {
            onDelete: "cascade"
          });
          User.belongsToMany(models.repo, {
            through: {
              model: models.users_repos_favorite,
              unique: false,
            },
            foreignKey: 'userId',
            constraints: false
          });
        }
      }
  });
  return User;
};
