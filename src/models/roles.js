"use strict";
const { v4, validate } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //role can belong to many  permissions through role_permissions table
      Role.belongsToMany(models.Permission, {
        through: "role_permissions",
        as: "permissions",
        foreignKey: "role_id",
        otherKey: "permission_id",
      });

      //role can belong to may users through the user_roles table
      Role.belongsToMany(models.User, {
        through: "user_roles",
        as: "users",
        foreignKey: "role_id",
        otherKey: "user_id",
      });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    },
  );
  //create the id automatically
  Role.beforeCreate((role, _) => {
    let valid = validate(role.id);
    if (!valid) {
      return (role.id = v4());
    }
    return (role.id = role.id);
  });
  return Role;
};
