const pg = require('pg');
const config = require('../../config.js');
const Immutable = require('immutable');

const users = {
  createUser(newUserDetails) {
    if (Immutable.Map.isMap(newUserDetails)) {
      newUserDetails = newUserDetails.toObject();
    }

    return new Promise(
      (resolve, reject) => {
        if (!newUserDetails.hasOwnProperty('username')) {
          reject('createUser requires the "username" parameter to be set');
        }

        if (!newUserDetails.hasOwnProperty('hash')) {
          reject('createUser requires the "hash" parameter to be set');
        }

        if (!newUserDetails.hasOwnProperty('salt')) {
          reject('createUser requires the "salt" parameter to be set');
        }

        if (!newUserDetails.hasOwnProperty('createTime')) {
          reject('createUser requires the "createTime" parameter to be set');
        }

        if (!newUserDetails.hasOwnProperty('role')) {
          reject('createUser requires the "role" parameter to be set');
        }
      }
    );
  },

  readUserById(userId) {

  },

  updateUser(userDetails) {

  },

  deleteUserById(userId) {

  }
};

module.exports = users;
