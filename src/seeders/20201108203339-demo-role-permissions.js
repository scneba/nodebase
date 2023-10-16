"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "role_permissions",
      [
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd1bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd2bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          permission_id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd3bed",
          role_id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
        },
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("role_permissions", null, {});
  },
};
