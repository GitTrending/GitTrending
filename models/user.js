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
  }, 
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
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
        }
      }
  });
  return User;
};
