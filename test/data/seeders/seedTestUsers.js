'use strict';

const queries = require('../../../src/data/utility/queries');

module.exports = function seedTestUsers(connectionString) {
  return new Promise(
    (resolve, reject) => {
      queries.simple(
        connectionString,
        `INSERT INTO Users ` +
        `  (user_name, first_name, last_name, email, email_validated, birthdate, hash, salt, created_at, role_key) ` +
        `VALUES ` +
        `  ('BruceWayne', 'Bruce', 'Wayne', 'BWayne@Wayne.Corporation', TRUE,  NULL, 'Potato', 'NaCl', '2015-05-19T15:44:22.123', 'batman'), ` +
        `  ('IronMan', 'Tony', 'Stark', 'IAmIronMan@iron.man', TRUE, '1970-05-29', 'BeanAndCheese', 'K2Cr2O7', '2012-08-15T04:47:12.157', 'admin'), ` +
        `  ('GreenLantern', 'Kyle', 'Rayner', 'Krayner@rayner.design', FALSE, NULL, 'Vegetable', 'NiCl26H2O', '2015-09-12T19:32:11.542', 'moderator'), ` +
        `  ('SupaDude', 'Clark', 'Kent', 'Kent@Daily.Planet', FALSE, '1980-06-18', 'CornedBeef', 'CaCl2', '2014-07-02T11:18:21.902', 'contributor'), ` +
        `  ('Smash', 'Bruce', 'Banner', 'Tranquil@not.angry', TRUE, '1962-05-15', 'Sausage', 'CuSO4', '2015-09-12T19:32:11.542', 'user'), ` +
        `  ('Joker', 'Joe', 'Kerr', 'Laughing@Clown.Prince', TRUE, '1972-10-30', 'PulledPork', 'NaHSO4', '2013-03-27T22:47:19.710', 'anonymous');`
      ).then(
        () => {
          resolve(`Test Users Seeded`);
        }
      ).catch(
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    }
  );
};

