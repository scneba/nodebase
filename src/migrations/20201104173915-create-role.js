"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("roles", {
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

      createdAt: {
        defaultValue: DataTypes.fn("NOW"),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: DataTypes.fn("NOW"),
        type: DataTypes.DATE,
      },
    });

    //add default roles
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "171e397f-c4cb-498d-a36b-10192fe6d050",
          name: "Admin",
          description: "Access to all",
        },
        {
          id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
          name: "Viewer",
          description: "Access to GET requests",
        },
        {
          id: "2d7bb01e-9159-4ff5-ab5e-464345b704a5",
          name: "Normal",
          description: "role for user without login credentials",
        },
      ],
      {},
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("roles");
  },
};
