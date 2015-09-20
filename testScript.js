'use strict';

const createUserTables = require('./src/data/database_setup/tables/users.js');
const seedPermissions = require('./src/data/database_setup/seeders/roles_and_permissions.js');
const selectQuery = require('./src/data/utility/selectQuery');
const pg = require('pg');

const connectionString = 'postgresql://node:TestDatabasePassword@localhost/electrongap';

createUserTables(connectionString)
  .then(
    (result) => {
      console.log(result);
      return seedPermissions(connectionString);
    }
  )
  .then(
    (result) => {
      console.log(result);
      console.log('IT SHOULD BE DONE');
      return selectQuery(connectionString, 'SELECT * FROM rolepermissions;');
    }
  )
  .then(
    (result) => {
      console.log(result.rows);
      pg.end();
    }
  )
  .catch(
    (error) => {
      console.error(error);
    }
  );

