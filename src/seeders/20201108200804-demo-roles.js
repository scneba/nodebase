"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "roles",
      [
        {
          id: "171e397f-c4cb-498d-a36b-10192fe6d050",
          name: "admin",
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("roles", null, {});
  },
};
