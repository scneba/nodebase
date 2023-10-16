"use strict";
const { v4, validate } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //user can belong to many roles in the user_roles table
      User.belongsToMany(models.Role, {
        through: "user_roles",
        as: "roles",
        foreignKey: "user_id",
        otherKey: "role_id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          max: 50,
        },
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          min: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );
  //create the id automatically if not supplied
  User.beforeCreate((user, _) => {
    let valid = validate(user.id);
    if (!valid) {
      return (user.id = v4());
    }
    return (user.id = user.id);
  });
  return User;
};
