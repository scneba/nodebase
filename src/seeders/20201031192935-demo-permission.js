"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
          path: "/pages",
          verb: "POST",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd2bed",
          path: "/pages",
          verb: "PUT",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          path: "/pages",
          verb: "GET",
        },
        {
          id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          path: "/pages",
          verb: "PATCH",
        },
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
