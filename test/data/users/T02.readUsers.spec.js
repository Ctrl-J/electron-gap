'use strict';

import Users from '../../../src/data/users';
import systemConfig from '../../../src/config';

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

describe('User read access',
  () => {
    describe('readUserById',
      () => {
        it('should throw an error on an invalid id',
          () => {
            return users.readUserById('invalid id')
              .catch(
                (error) => {
                  expect(error.message).to.equal('Invalid id entered (will never find invalid id)');
                });
          }
        );

        it('should not throw an error for a non-existing user (should return null)',
          () => {
            return users.readUserById(900)
              .then(
                (result) => {
                  expect(result).to.be.null;
                }
              );
          }
        );

        it('should return a valid user for a valid id',
          () => {
            const user = copyUser(testAdmin);
            user.id = 8;
            user.emailValidated = false;

            return users.readUserById(8)
              .then(
                (result) => {
                  expect(result.id).to.equal(user.id);
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
      }
    );

    describe('readUserByUsername',
      () => {
        it('should throw an error for a null username',
          () => {
            return users.readUserByUsername(null)
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot search for null or empty username.');
                }
              );
          }
        );

        it('should throw an error for an empty username',
          () => {
            return users.readUserByUsername('')
              .catch(
                (error) => {
                  expect(error.message).to.equal('Cannot search for null or empty username.');
                }
              );
          }
        );

        it('Should return null for not found',
          () => {
            return users.readUserByUsername('captainjack')
              .then(
                (result) => {
                  expect(result).to.be.null;
                }
              );
          }
        );

        it('Should return a valid user for an existing username',
          () => {
            const user = copyUser(testAdmin);
            user.id = 8;
            user.emailValidated = false;

            return users.readUserByUsername(user.username)
              .then(
                (result) => {
                  expect(result.id).to.equal(user.id);
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
      }
    );
  }
);
