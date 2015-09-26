'use strict';
import {Map} from 'immutable';

import Users from '../../src/data/users';
import systemConfig from '../../src/config';
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

const config = systemConfig;
config.db.database = 'electrongap_test';
const users = new Users(config);
const connectionString = `postgres://${config.db.username}:${config.db.password}@${config.db.address}/${config.db.database}`;

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

    describe('createUser',
      () => {
        it('should throw an error for missing username',
          () => {
            const user = testAdmin.delete('username');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "username" parameter to be set');
          }
        );

        it('should throw an error for missing hash',
          () => {
            const user = testAdmin.delete('hash');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "hash" parameter to be set');
          }
        );

        it('should throw an error for missing salt',
          () => {
            const user = testAdmin.delete('salt');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "salt" parameter to be set');
          }
        );

        it('should throw an error for missing email',
          () => {
            const user = testAdmin.delete('email');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "email" parameter to be set');
          }
        );

        it('should throw an error for missing createdAt',
          () => {
            const user = testAdmin.delete('createdAt');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "createdAt" parameter to be set');
          }
        );

        it('should throw an error for missing role',
          () => {
            const user = testAdmin.delete('role');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser requires the "role" parameter to be set');
          }
        );

        it('should throw an error on an invalid role',
          () => {
            const user = testAdmin.delete('role').set('role', 'samwise');

            return users.createUser(user)
              .should.be
              .rejectedWith('createUser failed because role "samwise" does not exist');
          }
        );

        it('should return an immutable user entry upon success',
          () => {
            return users.createUser(testAdmin)
              .should.eventually.have.keys(
                'id',
                'username',
                'firstName',
                'lastName',
                'email',
                'birthdate',
                'hash',
                'salt',
                'createdAt',
                'role'
              );
          }
        );

        it('should throw an error on duplicate email address',
          () => {
            const user = testAdmin.delete('username').set('username', 'DifferentUser');

            return users.createUser(user)
              .should.eventually.be
              .rejectedWith(`email "${user.get('email')}" is already registered to an account`);
          }
        );

        it('should throw an error on a taken username',
          () => {
            const user = testAdmin.delete('email').set('email', 'differentEmail@mail.com');

            return users.createUser(user)
              .should.eventually.be
              .rejectedWith(`username "${user.get('username')}" is already registered to an account`);
          }
        );
      }
    );

    describe('readUserById',
      () => {
        it('should throw an error on an invalid userId',
          () => {
            return users.readUserById('invalid id')
              .should.be
              .rejectedWith('Invalid id entered (will never find "invalid id")');
          }
        );

        it('should throw an error for a non-existing user',
          () => {
            return users.readUserById(456789)
              .should.be
              .rejectedWith('User not found (456789)');
          }
        );
      }
    );
  }
);
