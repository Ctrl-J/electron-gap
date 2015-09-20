'use strict';
import {Map} from 'immutable';
import Data from '../../src/data';
import config from '../../src/config';
import setupUserTables from '../../src/data/database_setup/tables/setupUserTables';
import seedPermissions from '../../src/data/database_setup/seeders/seedPermissions';

const testAdmin = Map({
  username: 'UserName',
  email: 'someone@email.com',
  firstName: 'First',
  lastName: 'Last',
  birthdate: new Date('1975-05-15'),
  hash: 'notarealhash',
  salt: 'notarealsalt',
  createdAt: new Date('2015-09-15T21:51:36.123Z'),
  role: 'admin'
});

const data = new Data();
const connectionString = `postgres://${config.db.username}:${config.db.password}@${config.db.address}/electrongap_test`;

describe('User data access',
  () => {
    before(
      (done) => {
        console.log('Initializing database for user data tests.');
        setupUserTables(connectionString)
          .then(
            (result) => {
              console.log(`${result} in test database.`);
              return seedPermissions(connectionString);
            }
          )
          .then(
            (result) => {
              console.log(`${result} into test database.`);
              done();
            }
          )
          .catch(
            (error) => {
              console.error(error);
              done();
            }
          );
      }
    );

    describe('createAdmin',
      () => {
        it('should throw an error for missing username',
          () => {
            const user = testAdmin.delete('username');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "username" parameter to be set');
          }
        );

        it('should throw an error for missing hash',
          () => {
            const user = testAdmin.delete('hash');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "hash" parameter to be set');
          }
        );

        it('should throw an error for missing salt',
          () => {
            const user = testAdmin.delete('salt');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "salt" parameter to be set');
          }
        );

        it('should throw an error for missing email',
          () => {
            const user = testAdmin.delete('email');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "email" parameter to be set');
          }
        );

        it('should throw an error for missing createdAt',
          () => {
            const user = testAdmin.delete('createdAt');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "createdAt" parameter to be set');
          }
        );

        it('should throw an error for missing role',
          () => {
            const user = testAdmin.delete('role');

            return data.users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "role" parameter to be set');
          }
        );
      }
    );
  }
);
