const pg = require('pg');
const config = require('../src/config');

// Initialize test database
pg.connect(`postgres://${config.db.username}:${config.db.password}@${config.db.address}/postgres`,
  (connPgdbError, pgdbClient, pgdbDone) => {
    if (connPgdbError) {
      console.error(`Error connecting: ${connPgdbError}`);
    }

    pgdbClient.query('DROP DATABASE electrongap_test;',
      (queryError) => {
        if (queryError) {
          console.error(queryError);
        }

        pgdbClient.end();
        pgdbDone();
      }
    );
  }
);
