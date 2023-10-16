"use strict";
const { v4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //permission can belong to many roles through the table role_permissions
      Permission.belongsToMany(models.Role, {
        through: "role_permissions",
        as: "roles",
        foreignKey: "permission_id",
        otherKey: "role_id",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      path: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      verb: {
        type: DataTypes.ENUM("POST", "GET", "PUT", "PATCH", "DELETE"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Permission",
      tableName: "permissions",
    },
  );
  //create the id automatically
  Permission.beforeCreate((permission, _) => {
    return (permission.id = v4());
  });
  return Permission;
};
