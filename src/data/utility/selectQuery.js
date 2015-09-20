const pg = require('pg');

module.exports = function standaloneQuery(connectionString, query) {
  return new Promise(
    (resolve, reject) => {
      pg.connect(connectionString,
        (error, client, done) => {
          client.query(query,
            (queryError, result) => {
              if (queryError) {
                reject(queryError);
              }

              done();
              resolve(result);
            }
          );
        }
      );
    }
  );
};
