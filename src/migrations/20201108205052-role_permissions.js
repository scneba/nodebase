"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "role_permissions",
      {
        permission_id: {
          type: DataTypes.UUID,
          references: {
            model: "permissions", // name of Target db table
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
          role_perm_unique: {
            fields: ["permission_id", "role_id"],
          },
        },
      },
    );

    //insert default admin roles
    await queryInterface.bulkInsert(
      "role_permissions",
      [
        {
          permission_id: "32c5af91-b391-4214-922b-c1059ffd453d",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "42c5af91-b391-4214-922b-c1059ffd453d",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "52c5af91-b391-4214-922b-c1059ffd453d",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "62c5af91-b391-4214-922b-c1059ffd453d",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "72c5af91-b391-4214-922b-c1059ffd453d",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },

        {
          permission_id: "eb7d0d3b-453f-4aee-9951-b23a93a46378",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "eb7d0d3b-453f-4aee-9951-b23a93a46377",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "eb7d0d3b-453f-4aee-9951-b23a93a46376",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "eb7d0d3b-453f-4aee-9951-b23a93a46375",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "eb7d0d3b-453f-4aee-9951-b23a93a46374",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },

        {
          permission_id: "93f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "83f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "73f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "63f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "53f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "36efbd60-d0a7-4e50-8e4d-b43e829224bd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "46efbd60-d0a7-4e50-8e4d-b43e829224bd",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
      ],
      {},
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("role_permissions");
  },
};
