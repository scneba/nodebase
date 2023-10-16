"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
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
    });

    //add admin user
    await queryInterface.bulkInsert("users", [
      {
        id: "f0784b55-3c34-4fb9-b1ff-5d679485b495",
        name: "clasence",
        username: "clasence",
        email: "scneba@gmail.com",
        password:
          "$2b$10$Bw92k675v8rkojswzRAfQOgH15lERT8Rq9DYYW7K0MBe262NOSb6.",
      },
    ]);
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("users");
  },
};
