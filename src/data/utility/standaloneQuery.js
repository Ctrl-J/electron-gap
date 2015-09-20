const pg = require('pg');

module.exports = function standaloneQuery(connectionString, query) {
  return new Promise(
    (resolve, reject) => {
      if (connectionString === null) {
        reject(new Error('Connection string was invalid.'));
      }

      pg.connect(connectionString,
        (error, client, done) => {
          if (error) {
            reject(error);
          }

          client.query(query,
            (queryError) => {
              if (queryError) {
                reject(queryError);
              }

              done();
              resolve('Query completed successfully');
            }
          );
        }
      );
    }
  );
};
