'use strict';

import Users from '../../../src/data/users';
import systemConfig from '../../../src/config';
import setupUserTables from '../../../src/data/database_setup/tables/setupUserTables';
import seedPermissions from '../../../src/data/database_setup/seeders/seedPermissions';
import seedTestUsers from '../seeders/seedTestUsers';

const expect = require('chai').expect;

const testAdmin = {
  username: 'UserName',
  email: 'someone@email.com',
  firstName: 'First',
  lastName: 'Last',
  birthdate: new Date('1975-05-14T07:00:00.000Z'),
  hash: 'notarealhash',
  salt: 'notarealsalt',
  createdAt: new Date('2015-09-15T21:51:36.123Z'),
  role: 'admin'
};

const testContributor = {
  username: 'DarkwingDuck',
  email: 'danger@terror.flapping',
  firstName: 'Drake',
  lastName: 'Mallard',
  birthdate: null,
  hash: 'notarealhash',
  salt: 'notarealsalt',
  createdAt: new Date('2015-10-08T22:23:19.414Z'),
  role: 'contributor'
};

function copyUser(other) {
  const newUser = {};
  for (const key in other) {
    if (other[key] !== undefined) {
      newUser[key] = other[key];
    }
  }

  return newUser;
}

const config = systemConfig;
config.db.database = 'electrongap_test';
const users = new Users(config);
const connectionString = `postgres://${config.db.username}:${config.db.password}@${config.db.address}/${config.db.database}`;

describe('User write access',
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
              return seedTestUsers(connectionString);
            }
          )
          .then(
            (result) => {
              console.log(`${result} into test database.`);
              done();
            })
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
            const user = copyUser(testAdmin);
            delete user.username;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the username parameter to be set.');
                });
          }
        );

        it('should throw an error for missing hash',
          () => {
            const user = copyUser(testAdmin);
            delete user.hash;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the hash parameter to be set.');
                });
          }
        );

        it('should throw an error for missing salt',
          () => {
            const user = copyUser(testAdmin);
            delete user.salt;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the salt parameter to be set.');
                });
          }
        );

        it('should throw an error for missing email',
          () => {
            const user = copyUser(testAdmin);
            delete user.email;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the email parameter to be set.');
                });
          }
        );

        it('should throw an error for missing createdAt',
          () => {
            const user = copyUser(testAdmin);
            delete user.createdAt;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the createdAt parameter to be set.');
                });
          }
        );

        it('should throw an error for missing role',
          () => {
            const user = copyUser(testAdmin);
            delete user.role;

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser requires the role parameter to be set.');
                });
          }
        );

        it('should throw an error on an invalid role',
          () => {
            const user = copyUser(testAdmin);
            user.role = 'samwise';

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('createUser failed because role samwise does not exist.');
                });
          }
        );

        it('should return an valid user entry upon successful user creation',
          () => {
            const user = copyUser(testAdmin);
            user.id = 8;
            user.emailValidated = false;

            return users.createUser(testAdmin)
              .then(
                (result) => {
                  expect(result).to.deep.equal(user);
                }
              );
          }
        );

        it('should set the emailValidated flag to false upon creation',
          () => {
            const user = copyUser(testContributor);
            user.emailValidated = false;

            return users.createUser(testContributor)
              .then(
                (result) => {
                  expect(result.username).to.equal(user.username);
                  expect(result.firstName).to.equal(user.firstName);
                  expect(result.lastName).to.equal(user.lastName);
                  expect(result.email).to.equal(user.email);
                  expect(result.emailValidated).to.equal(user.emailValidated);
                  expect(result.birthdate).to.deep.equal(user.birthdate);
                  expect(result.hash).to.equal(user.hash);
                  expect(result.salt).to.equal(user.salt);
                  expect(result.createdAt).to.deep.equal(user.createdAt);
                  expect(result.role).to.equal(user.role);
                }
              );
          }
        );

        it('should throw an error on duplicate email address',
          () => {
            const user = copyUser(testAdmin);
            user.username = 'DifferentUser';

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal(`email ${user.email} is already registered to an account.`);
                }
              );
          }
        );

        it('should throw an error on a taken username',
          () => {
            const user = copyUser(testAdmin);
            user.email = 'differentEmail@mail.com';

            return users.createUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.deep.equal(`Cannot set username to ${user.username}, username already in use.`);
                }
              );
          }
        );
      }
    );

    describe('updateUser',
      () => {
        it('should throw an error for missing id',
          () => {
            return users.updateUser(testAdmin)
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot update user entry without id.');
                }
              );
          }
        );

        it('should throw an error for missing username',
          () => {
            const user = copyUser(testAdmin);
            user.id = 1;
            delete user.username;

            return users.updateUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot update user entry without username.');
                }
              );
          }
        );

        it('should throw an error for missing email',
          () => {
            const user = copyUser(testAdmin);
            user.id = 1;
            delete user.email;

            return users.updateUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot update user entry without email address.');
                });
          }
        );

        it('should throw an error if the username is updated to one that already exists',
          () => {
            const user = copyUser(testAdmin);
            user.id = 1;
            user.username = 'IronMan';

            return users.updateUser(user)
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot change username to IronMan, username already in use.');
                }
              );
          }
        );
      }
    );
  }
);
