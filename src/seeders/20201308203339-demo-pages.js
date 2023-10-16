"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "pages",
      [
        {
          id: "06615861-1659-47db-89fa-b81732a6579a",
          title: "All pages in document",
          image: "/pages/images.png",
          path: "/pages",
        },
        {
          id: "06615861-1659-47db-89fa-b81732a6578a",
          title: "Page 1 of doc",
          image: "/pages/image2.png",
          path: "/pages/1",
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
    await queryInterface.bulkDelete("pages", null, {});
  },
};
