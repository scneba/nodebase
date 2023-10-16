"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
          name: "clasence",
          username: "clasence",
          email: "scneba@gmail.com",
          password:
            "$2b$10$Bw92k675v8rkojswzRAfQOgH15lERT8Rq9DYYW7K0MBe262NOSb6.",
        },
        {
          id: "f0784b55-3c34-4fb9-b1ff-5d679485b494",
          name: "Clasence Neba",
          username: "neba",
          email: "neba@gmail.com",
          password: "jowfn0o3nfogvbnioarnfwgiosnsgosesonwoiwioen2",
        },
        {
          id: "f0784b55-3c34-4fb9-b1ff-5d679485b493",
          name: "Clasence Shu",
          username: "shu",
          email: "shu@gmail.com",
          password: "jowfn0o3nfogvbnioarnfwgiosnsgosesonwoiwioen3",
        },
        {
          id: "f0784b55-3c34-4fb9-b1ff-5d679485b491",
          name: "Random user",
          username: "random",
          email: "random@gmail.com",
          password: "jowfn0o3nfogvbnioarnfwgiosnsgosesonwoiwioe21",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
