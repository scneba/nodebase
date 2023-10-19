## Node.js Base Backend

This is a base project which helps any node.js developer or startup to setup a base for user/role/permission management, testing, dockerization and CI/CD.
This is usually a first and difficult step for any startup and this project will get you up and running immediatately.

### Technologies and Resources

- Git
- PostgreSQL
- Node.js
- Sequelize ORM
- Postman

### Setup

1. Download and install git from [here](https://git-scm.com/downloads). This should also install git bash which can be opened from the windows start menu.
2. Download and Install PgAdmin 4 from [here](https://www.pgadmin.org/download/pgadmin-4-windows/). This should come with postgresql and should automatically run after installation on port 5432. Make sure to take note of your passwords, there should be a PgAdmin password and the default user password. After install, open git bash and run the following commands to check if postgres is running on same port

```
psql --version
```

If the version does not show up, add psql path to your system paths. On windows,
this is installed by default at `C:\Program Files\PostgreSQL\14\bin`

- Connect user (use the default username, should be postgres if not changed)

```
psql -U postgres
```

- Check connection status

```
\conninfo
```

You should see output like this image here \
![image](./images/psql.PNG)

- Start PgAdmin from windows start menu and input your passwords.
- Create a database called `node_base` with the user postgres.

3. Install Node.js. Download your variant from [here](https://nodejs.org/en/download/)

- After install, open git bash and type the command below to see if you get the help page

```
npm -h
```

4. install sequelize-cli globally

```
npm install -g sequelize-cli
```

After installation, the command should display the help page

```
npx sequelize-cli --help
```

5. Clone this repository

```
git clone https://github.com/scneba/nodebase
```

6. open git bash on the root folder and run

```
npm install
```

7. Make a copy of the .env.example and rename it to .env
8. Update the connection string on line 2 to include your postgres user password (update the string _password_ below)

```
CONN_ST=postgres://postgres:password@localhost:5432/nodebase
```

9. Run `npm run dev` on the root folder. This should run the migrations on the nodebase database.

10. Install postman and create an account. Download from [here](https://www.postman.com/downloads/).

## Development

### File structure

**--postman** \
**--files.json** postman collections. \
**--src** all source code should be added in here. \
**--controllers** MVC controllers - all core logic for endpoint control is added here. \
&nbsp;&nbsp;&nbsp;**--errors.js** All error contants. Any errors reported in this service should be here. \
&nbsp;&nbsp;&nbsp;**--service.js** All the logic for the sub controller should be added here. \
&nbsp;&nbsp;&nbsp;**--service.test.js** All tests for this controller should be added here. See the documentation for jest testing [here](https://jestjs.io/docs/getting-started). \
**--data** all database access methods are added here. \
**--migrations** All Sequelize migrations are added here. See the docs [here](n. \
**--models** All database models for Sequelize
**--routes** All routes contained in the repo.
**--seeders** All Sequelize seeds see [here]s(https://sequelize.org/master/manual/migrations.html#running-seeds) for the docs. \
**--services** All access to external services are added here, cross platform requests. \
**--utils** Any reusable javascript code \
**--app.js** entry point of application. \
**--migrate.js** service to run migrations when user first runs app. \
**--storage** storage for sessions

### Run Seeds and Migrations with Sequelize

- cd into src and run the following command to create a sequelize config file

```
 npx sequelize init
```

This should only create config/config.yml file and fail to create model and migrations folders which already exist.

Update the config/config.json file to reflect the database configurations

```
"development": {
    "username": "postgres",
    "password": "YOURPASSWORD",
    "database": "nodebase",
    "host": "127.0.0.1",
    "dialect": "postgres"
},
```

### Seeding

Undo all seeds

```
npx sequelize-cli db:seed:undo:all
```

Seed Database

```
npx sequelize-cli db:seed:all
```

### Testing

Ideally, all core logic in controllers should be tested. To test particulr sub controller/file, use the testPathPattern eg.

```
npm test -- --testPathPattern "registering/"
```

This will run all tests in the registering/ path.

### Postman

Import the collection at /postman/role_base.postman_collection.json into postman.
Update the domain variable in postman
![image](./images/postman.jpg)

- Start project with nodemon

```
npm run dev
```

- Run postman collection and make sure all tests pass
  ![image](./images/postman_all_tests.jpg)
