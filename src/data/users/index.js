const Immutable = require('immutable');
const queries = require('../utility/queries');

class Users {
  constructor(config) {
    this.config = config;
  }

  createUser(newUserDetails) {
    let userDetails = newUserDetails;
    if (Immutable.Map.isMap(newUserDetails)) {
      userDetails = newUserDetails.toObject();
    }

    const connectionString = `postgresql://${this.config.db.username}:${this.config.db.password}@${this.config.db.address}/${this.config.db.database}`;

    return new Promise(
      (resolve, reject) => {
        if (!userDetails.hasOwnProperty('username')) {
          return reject(new Error('createUser requires the "username" parameter to be set'));
        }

        if (!userDetails.hasOwnProperty('hash')) {
          return reject(new Error('createUser requires the "hash" parameter to be set'));
        }

        if (!userDetails.hasOwnProperty('salt')) {
          return reject(new Error('createUser requires the "salt" parameter to be set'));
        }

        if (!userDetails.hasOwnProperty('createdAt')) {
          return reject(new Error('createUser requires the "createdAt" parameter to be set'));
        }

        if (!userDetails.hasOwnProperty('role')) {
          return reject(new Error('createUser requires the "role" parameter to be set'));
        }

        if (!userDetails.hasOwnProperty('email')) {
          return reject(new Error('createUser requires the "email" parameter to be set'));
        }

        queries.withParams(
          connectionString,
          'SELECT * FROM Roles WHERE key = $1;',
          [ userDetails.role ]
        ).then(
          (result) => {
            if (result.rows.length <= 0) {
              return reject(new Error(`createUser failed because role "${userDetails.role}" does not exist.`));
            }

            return queries.withParams(
              connectionString,
              `INSERT INTO Users ` +
              `( ` +
              `  user_name, ` +
              `  first_name, ` +
              `  last_name, ` +
              `  email, ` +
              `  birthdate, ` +
              `  hash, ` +
              `  salt, ` +
              `  created_at, ` +
              `  role_key ` +
              `) ` +
              `VALUES ` +
              `( ` +
              `  $1, ` +
              `  $2, ` +
              `  $3, ` +
              `  $4, ` +
              `  $5, ` +
              `  $6, ` +
              `  $7, ` +
              `  $8, ` +
              `  $9 ` +
              `) ` +
              `RETURNING id;`,
              [
                userDetails.username,
                userDetails.firstName,
                userDetails.lastName,
                userDetails.email,
                userDetails.birthdate,
                userDetails.hash,
                userDetails.salt,
                userDetails.createdAt,
                userDetails.role
              ]
            );
          }
        ).then(
          (result) => {
            const id = parseInt(result.rows[0].id, 10);
            return resolve(this.readUserById(id));
          }
        ).catch(
          (error) => {
            if (error.hasOwnProperty('constraint')) {
              if (error.constraint === 'users_user_name_key') {
                return reject(new Error(`username "${userDetails.username}" is already registered to an account`));
              } else if (error.constraint === 'users_email_key') {
                return reject(new Error(`email "${userDetails.email}" is already registered to an account`));
              }
            }

            return reject(error);
          }
        );
      }
    );
  }

  readUserById(userId) {
    return new Promise(
      (resolve, reject) => {
        if ((typeof userId !== 'number') || ((userId % 1) !== 0)) {
          return reject(new Error(`Invalid id entered (will never find "${userId}")`));
        }

        const connectionString = `postgresql://${this.config.db.username}:${this.config.db.password}@${this.config.db.address}/${this.config.db.database}`;

        queries.withParams(
          connectionString,
          'SELECT * FROM Users WHERE Id = $1',
          [ userId ]
        ).then(
          (result) => {
            if (result.rowCount <= 0) {
              return reject(new Error(`User not found (${userId})`));
            }
            const targetUser = result.rows[0];
            return resolve(
              Immutable.Map({
                id: targetUser.id,
                username: targetUser.user_name,
                firstName: targetUser.first_name,
                lastName: targetUser.last_name,
                email: targetUser.email,
                birthdate: targetUser.birthdate,
                hash: targetUser.hash,
                salt: targetUser.salt,
                createdAt: targetUser.created_at,
                role: targetUser.role_key
              })
            );
          }
        ).catch(
          (error) => {
            return reject(error);
          }
        );
      }
    );
  }

  updateUser(userDetails) {

  }

  deleteUserById(userId) {

  }
}

module.exports = Users;
