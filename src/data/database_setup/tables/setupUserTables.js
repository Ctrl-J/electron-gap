'use strict';
const queries = require('../../utility/queries');

module.exports = function setupUserTables(connectionString) {
  return new Promise(
    (resolve, reject) => {
      queries.simple(
        connectionString,
        `CREATE TABLE Permissions( ` +
        `key         TEXT PRIMARY KEY NOT NULL, ` +
        `description TEXT NOT NULL ` +
        `);`
      ).then(
        () => {
          return queries.simple(
            connectionString,
            `CREATE TABLE Roles( ` +
            `  key         TEXT PRIMARY KEY NOT NULL, ` +
            `  description TEXT NOT NULL ` +
            `); `
          );
        }
      ).then(
        () => {
          return queries.simple(
            connectionString,
            `CREATE TABLE RolePermissions( ` +
            `  role_key        TEXT NOT NULL ` +
            `      CONSTRAINT FK_RolePermission_RoleKey ` +
            `      REFERENCES Roles(key), ` +
            `  permission_key  TEXT NOT NULL ` +
            `      CONSTRAINT FK_RolePermission_PermissionKey ` +
            `      REFERENCES Permissions(key), ` +
            `  PRIMARY KEY(role_key, permission_key) ` +
            `); `
          );
        }
      ).then(
        () => {
          return queries.simple(
            connectionString,
            `CREATE TABLE Users( ` +
            `  id             BIGSERIAL PRIMARY KEY NOT NULL, ` +
            `  user_name      TEXT UNIQUE NOT NULL, ` +
            `  first_name     TEXT, ` +
            `  last_name      TEXT, ` +
            `  email          TEXT UNIQUE NOT NULL, ` +
            `  birthdate      DATE, ` +
            `  hash           TEXT NOT NULL, ` +
            `  salt           TEXT NOT NULL, ` +
            `  created_at     TIMESTAMP NOT NULL, ` +
            `  role_key       TEXT NOT NULL ` +
            `      CONSTRAINT FK_User_RoleKey ` +
            `      REFERENCES Roles(key) ` +
            `);`
          );
        }
      ).then(
        () => {
          resolve('User & permission tables created successfully');
        }
      ).catch(
        (error) => {
          reject(error);
        }
      );
    }
  );
};
