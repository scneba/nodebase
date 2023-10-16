const { Sequelize } = require("sequelize");
const path = require("path");
const Umzug = require("umzug");
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(process.env.CONN_ST, {
  dialect: "postgres",
});

//https://www.npmjs.com/package/umzug
const migrate = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, "./migrations"),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

const seeders = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, "./seeders"),
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize.getQueryInterface(), Sequelize],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
    modelName: "SequelizeData", // Or whatever you want to name the seeder storage table
  },
});

(async () => {
  // checks migrations and run them if they are not already applied
  await migrate
    .up()
    .then(() => {
      console.log("All migrations performed successfully");
      if (env == "development" || env == "staging") {
        /* Note .down does not really work, to seed and undo all seeds use
        npx sequelize-cli db:seed:all
        and
        npx sequelize-cli db:seed:undo:all 
        on the command line */
        // seeders
        //   .down()
        //   .then(() => {
        //     console.log("Seeder down success");
        //     seeders
        //       .up()
        //       .then(() => console.log("seeder up success"))
        //       .catch((err) => console.log(err));
        //   })
        //   .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
})();
