"use strict";
const { v4 } = require("uuid");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      path: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Page",
      tableName: "pages",
    },
  );
  //create the id automatically
  Page.beforeCreate((page, _) => {
    return (page.id = v4());
  });
  return Page;
};
