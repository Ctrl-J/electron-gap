const pg = require('pg');

module.exports = {
  simple(connectionString, query) {
    return new Promise(
      (resolve, reject) => {
        pg.connect(connectionString,
          (error, client, done) => {
            if (error) {
              reject(error);
              done();
              return;
            }

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
  },

  withParams(connectionString, query, values) {
    return new Promise(
      (resolve, reject) => {
        pg.connect(
          connectionString,
          (error, client, done) => {
            if (error) {
              done();
              return reject(error);
            }

            client.query(query, values,
              (queryError, result) => {
                if (queryError) {
                  done();
                  return reject(queryError);
                }

                done();
                return resolve(result);
              }
            );
          }
        );
      }
    );
  }
};
