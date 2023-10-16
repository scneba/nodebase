"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
          role_id: "171e397f-c4cb-498d-a36b-10192fe6d050",
        },
        {
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b494",
          role_id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
        },
        {
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b493",
          role_id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
        },
        {
          user_id: "f0784b55-3c34-4fb9-b1ff-5d679485b491",
          role_id: "2d7bb01e-9159-4ff5-ab5e-464345b704a4",
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
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
