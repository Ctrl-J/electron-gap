const queries = require('../utility/queries');

class Users {
  constructor(config) {
    this.config = config;
  }

  createUser(newUserDetails) {
    const connectionString = `postgresql://${this.config.db.username}:${this.config.db.password}@${this.config.db.address}/${this.config.db.database}`;

    return new Promise(
      (resolve, reject) => {
        if (!newUserDetails.hasOwnProperty('username')) {
          return reject(new Error('createUser requires the username parameter to be set.'));
        }

        if (!newUserDetails.hasOwnProperty('hash')) {
          return reject(new Error('createUser requires the hash parameter to be set.'));
        }

        if (!newUserDetails.hasOwnProperty('salt')) {
          return reject(new Error('createUser requires the salt parameter to be set.'));
        }

        if (!newUserDetails.hasOwnProperty('createdAt')) {
          return reject(new Error('createUser requires the createdAt parameter to be set.'));
        }

        if (!newUserDetails.hasOwnProperty('role')) {
          return reject(new Error('createUser requires the role parameter to be set.'));
        }

        if (!newUserDetails.hasOwnProperty('email')) {
          return reject(new Error('createUser requires the email parameter to be set.'));
        }

        queries.withParams(
          connectionString,
          `INSERT INTO Users ` +
          `( ` +
          `  user_name, ` +
          `  first_name, ` +
          `  last_name, ` +
          `  email, ` +
          `  email_validated, ` +
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
          `  FALSE, ` +
          `  $5, ` +
          `  $6, ` +
          `  $7, ` +
          `  $8, ` +
          `  $9 ` +
          `) ` +
          `RETURNING id;`,
          [
            newUserDetails.username,
            newUserDetails.firstName,
            newUserDetails.lastName,
            newUserDetails.email,
            newUserDetails.birthdate,
            newUserDetails.hash,
            newUserDetails.salt,
            newUserDetails.createdAt,
            newUserDetails.role
          ]
        ).then(
          (result) => {
            const id = parseInt(result.rows[0].id, 10);
            this.readUserById(id)
              .then(
                (readUserResult) => {
                  return resolve(readUserResult);
                }
              );
          }
        ).catch(
          (error) => {
            if (error.hasOwnProperty('constraint')) {
              if (error.constraint === 'fk_user_role_key') {
                return reject(new Error(`createUser failed because role ${newUserDetails.role} does not exist.`));
              } else if (error.constraint === 'users_email_key') {
                return reject(new Error(`email ${newUserDetails.email} is already registered to an account.`));
              } else if (error.constraint === 'uq_user_name') {
                return reject(new Error(`Cannot set username to ${newUserDetails.username}, username already in use.`));
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
          return reject(new Error(`Invalid id entered (will never find ${userId})`));
        }

        const connectionString = `postgresql://${this.config.db.username}:${this.config.db.password}@${this.config.db.address}/${this.config.db.database}`;

        queries.withParams(
          connectionString,
          'SELECT * FROM Users WHERE Id = $1',
          [ userId ]
        ).then(
          (result) => {
            if (result.rowCount <= 0) {
              return resolve(null);
            }
            const targetUser = {
              username: result.rows[0].user_name,
              firstName: result.rows[0].first_name,
              lastName: result.rows[0].last_name,
              email: result.rows[0].email,
              emailValidated: result.rows[0].email_validated,
              hash: result.rows[0].hash,
              salt: result.rows[0].salt,
              role: result.rows[0].role_key
            };

            targetUser.id = parseInt(result.rows[0].id, 10);

            const birthdate = result.rows[0].birthdate;
            if (birthdate !== null) {
              targetUser.birthdate = new Date(birthdate);
            } else {
              targetUser.birthdate = null;
            }

            const createdAt = result.rows[0].created_at;
            if (createdAt !== null) {
              targetUser.createdAt = new Date(createdAt);
            } else {
              targetUser.createdAt = null;
            }

            return resolve(targetUser);
          }
        ).catch(
          (error) => {
            return reject(error);
          }
        );
      }
    );
  }

  readUserByUsername(username) {
    return new Promise(
      (resolve, reject) => {
        if ((username === null) || (username === '')) {
          return reject(new Error('Cannot search for null or empty username.'));
        }

        const connectionString = `postgresql://${this.config.db.username}:${this.config.db.password}@${this.config.db.address}/${this.config.db.database}`;

        queries.withParams(
          connectionString,
          `SELECT * FROM Users WHERE user_name = $1`,
          [ username ]
        ).then(
          (result) => {
            if (result.rowCount <= 0) {
              return resolve(null);
            }

            const targetUser = {
              username: result.rows[0].user_name,
              firstName: result.rows[0].first_name,
              lastName: result.rows[0].last_name,
              email: result.rows[0].email,
              emailValidated: result.rows[0].email_validated,
              hash: result.rows[0].hash,
              salt: result.rows[0].salt,
              role: result.rows[0].role_key
            };

            targetUser.id = parseInt(result.rows[0].id, 10);

            const birthdate = result.rows[0].birthdate;
            if (birthdate !== null) {
              targetUser.birthdate = new Date(birthdate);
            } else {
              targetUser.birthdate = null;
            }

            const createdAt = result.rows[0].created_at;
            if (createdAt !== null) {
              targetUser.createdAt = new Date(createdAt);
            } else {
              targetUser.createdAt = null;
            }

            return resolve(targetUser);
          }
        );
      }
    );
  }

  updateUser(userDetails) {
    return new Promise(
      (resolve, reject) => {
        if (!userDetails.hasOwnProperty('id')) {
          return reject(new Error('Cannot update user entry without id.'));
        }

        if (!userDetails.hasOwnProperty('username')) {
          return reject(new Error('Cannot update user entry without username.'));
        }

        if (!userDetails.hasOwnProperty('email')) {
          return reject(new Error('Cannot update user entry without email address.'));
        }

        this.readUserByUsername(userDetails.username)
          .then(
            (result) => {
              if (result !== undefined) {
                return reject(new Error(`Cannot change username to ${userDetails.username}, username already in use.`));
              }

              return resolve({});
            }
          )
          .catch(
            (error) => {
              return reject(error);
            }
          );
      }
    );
  }

  deleteUserById(userId) {
  }
}

module.exports = Users;
