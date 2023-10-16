"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("pages", {
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
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      createdAt: {
        defaultValue: DataTypes.fn("NOW"),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: DataTypes.fn("NOW"),
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("pages");
  },
};
