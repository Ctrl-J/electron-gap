const pg = require('pg');
const config = require('../../config.js');
const Immutable = require('immutable');

const users = {
  createUser(newUserDetails) {
    let userDetails = newUserDetails;
    if (Immutable.Map.isMap(newUserDetails)) {
      userDetails = newUserDetails.toObject();
    }

    return new Promise(
      (resolve, reject) => {
        if (!userDetails.hasOwnProperty('username')) {
          reject('createUser requires the "username" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('hash')) {
          reject('createUser requires the "hash" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('salt')) {
          reject('createUser requires the "salt" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('createdAt')) {
          reject('createUser requires the "createdAt" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('role')) {
          reject('createUser requires the "role" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('email')) {
          reject('createUser requires the "email" parameter to be set');
        }

        if (!userDetails.hasOwnProperty('role')) {
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
