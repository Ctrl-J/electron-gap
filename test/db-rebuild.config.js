const pg = require('pg');
const config = require('../src/config').db;
const setupDb = require('./db-setup.config.js');

// Initialize test database
function teardownDatabase(connectionString) {
  return new Promise(
    (resolve, reject) => {
      pg.connect(
        connectionString,
        (connPgdbError, pgdbClient, pgdbDone) => {
          if (connPgdbError) {
            reject(connPgdbError);
          }

          pgdbClient.query('DROP DATABASE IF EXISTS electrongap_test;',
            (queryError, result) => {
              if (queryError) {
                reject(queryError);
              }

              pgdbDone();
              resolve(result);
            }
          );
        }
      );
    }
  );
}

const connString = `postgres://${config.username}:${config.password}@${config.address}/postgres`;

teardownDatabase(connString)
  .then(
    () => {
      console.log('test database destroyed...');
      return setupDb(connString);
    }
  ).then(
    () => {
      console.log('test database initialized...');
      pg.end();
    }
  ).catch(
    (error) => {
      console.error(error);
    }
  );
