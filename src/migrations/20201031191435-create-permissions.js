"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "permissions",
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
          path_verb_unique: {
            fields: ["path", "verb"],
          },
        },
      },
    );

    //add default permissions
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          id: "32c5af91-b391-4214-922b-c1059ffd453d",
          path: "/api/users",
          verb: "POST",
        },
        {
          id: "42c5af91-b391-4214-922b-c1059ffd453d",
          path: "/api/users",
          verb: "GET",
        },
        {
          id: "52c5af91-b391-4214-922b-c1059ffd453d",
          path: "/api/users",
          verb: "PATCH",
        },
        {
          id: "62c5af91-b391-4214-922b-c1059ffd453d",
          path: "/api/users",
          verb: "PUT",
        },
        {
          id: "72c5af91-b391-4214-922b-c1059ffd453d",
          path: "/api/users",
          verb: "DELETE",
        },

        {
          id: "eb7d0d3b-453f-4aee-9951-b23a93a46378",
          path: "/api/permissions",
          verb: "POST",
        },
        {
          id: "eb7d0d3b-453f-4aee-9951-b23a93a46377",
          path: "/api/permissions",
          verb: "GET",
        },
        {
          id: "eb7d0d3b-453f-4aee-9951-b23a93a46376",
          path: "/api/permissions",
          verb: "PATCH",
        },
        {
          id: "eb7d0d3b-453f-4aee-9951-b23a93a46375",
          path: "/api/permissions",
          verb: "PUT",
        },
        {
          id: "eb7d0d3b-453f-4aee-9951-b23a93a46374",
          path: "/api/permissions",
          verb: "DELETE",
        },

        {
          id: "93f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          path: "/api/roles",
          verb: "POST",
        },
        {
          id: "83f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          path: "/api/roles",
          verb: "GET",
        },
        {
          id: "73f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          path: "/api/roles",
          verb: "PATCH",
        },
        {
          id: "63f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          path: "/api/roles",
          verb: "PUT",
        },
        {
          id: "53f2ab62-1375-486f-ac6f-b4d39e4af4dd",
          path: "/api/roles",
          verb: "DELETE",
        },
        {
          id: "36efbd60-d0a7-4e50-8e4d-b43e829224bd",
          path: "/api/rolepermissions",
          verb: "DELETE",
        },
        {
          id: "46efbd60-d0a7-4e50-8e4d-b43e829224bd",
          path: "/api/userroles",
          verb: "DELETE",
        },
      ],
      {},
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("permissions");
  },
};
