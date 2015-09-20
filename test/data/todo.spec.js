'use strict';
import {Map} from 'immutable';
import Data from '../../src/data';

const testAdmin = Map({
  username: 'UserName',
  firstName: 'First',
  lastName: 'Last',
  birthdate: new Date('1975-05-15'),
  hash: 'notarealhash',
  salt: 'notarealsalt',
  createTime: new Date('2015-09-15T21:51:36.123Z'),
  role: 'admin'
});

const data = new Data();

describe('Todo data access', () => {
  before(() => {

  });

  describe('createAdmin', () => {
    it('should throw an error for missing username', () => {
      const user = testAdmin.delete('username');

      return data.users.createUser(user)
        .should.be
        .rejectedWith('createUser requires the "username" parameter to be set');
    });

    it('should throw an error for missing hash', () => {
      const user = testAdmin.delete('hash');

      return data.users.createUser(user)
        .should.be
        .rejectedWith('createUser requires the "hash" parameter to be set');
    });

    it('should throw an error for missing salt', () => {
      const user = testAdmin.delete('salt');

      return data.users.createUser(user)
        .should.be
        .rejectedWith('createUser requires the "salt" parameter to be set');
    });

    it('should throw an error for missing createTime', () => {
      const user = testAdmin.delete('createTime');

      return data.users.createUser(user)
        .should.be
        .rejectedWith('createUser requires the "createTime" parameter to be set');
    });

    it('should throw an error for missing role', () => {
      const user = testAdmin.delete('role');

      return data.users.createUser(user)
        .should.be
        .rejectedWith('createUser requires the "role" parameter to be set');
    });
  });
});
