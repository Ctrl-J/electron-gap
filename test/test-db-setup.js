const pg = require('pg');

// Initialize test database

pg.connect('postgres://node:AuroraSirensAreLoud@localhost/postgres',
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
        pgdbDone();
      }
    );
  }
);
