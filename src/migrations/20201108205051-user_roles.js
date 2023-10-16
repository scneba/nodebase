"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "user_roles",
      {
        user_id: {
          type: DataTypes.UUID,
          references: {
            model: "users", // name of Target db table
            key: "id", // key in Target table that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        role_id: {
          type: DataTypes.UUID,
          references: {
            model: "roles", // name of Target db table
            key: "id", // key in Target table that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: {
          defaultValue: DataTypes.fn("NOW"),
          type: DataTypes.DATE,
        },
        updatedAt: {
          defaultValue: DataTypes.fn("NOW"),
          type: DataTypes.DATE,
        },
      },
      {
        uniqueKeys: {
          user_Role_unique: {
            fields: ["user_id", "role_id"],
          },
        },
      },
    );

    //add admin user role
    await queryInterface.bulkInsert("user_roles", [
      {
        user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
        role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
      },
    ]);
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("user_roles");
  },
};
