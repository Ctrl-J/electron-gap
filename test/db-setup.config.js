const pg = require('pg');
const config = require('../src/config').db;

// Initialize test database
module.exports = function initializeDatabase(connectionString) {
  return new Promise(
    (resolve, reject) => {
      pg.connect(
        connectionString,
        (connPgdbError, pgdbClient, pgdbDone) => {
          if (connPgdbError) {
            reject(connPgdbError);
          }

          pgdbClient.query('CREATE DATABASE electrongap_test;',
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
};
