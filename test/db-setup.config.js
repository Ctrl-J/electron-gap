const pg = require('pg');
const config = require('../src/config');

// Initialize test database

pg.connect(`postgres://${config.db.username}:${config.db.password}@${config.db.address}/postgres`,
  (connPgdbError, pgdbClient, pgdbDone) => {
    if (connPgdbError) {
      console.error(`Error connecting: ${connPgdbError}`);
    }
    pgdbClient.query('CREATE DATABASE electrongap_test;',
      (createError) => {
        console.log('CREATED ELECTRONGAP_TEST DATABASE');
        if (createError) {
          console.error(createError);
        }
        pgdbClient.end();
      }
    );
  }
);
