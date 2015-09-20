'use strict';
const standaloneQuery = require('../../utility/standaloneQuery');

module.exports = function setupUserTables(connectionString) {
  return new Promise(
    (resolve, reject) => {
      standaloneQuery(
        connectionString,
        `CREATE TABLE Permissions( ` +
        `key         TEXT PRIMARY KEY NOT NULL, ` +
        `description TEXT NOT NULL ` +
        `);`
      ).then(
        () => {
          return standaloneQuery(
            connectionString,
            `CREATE TABLE Roles( ` +
            `  key         TEXT PRIMARY KEY NOT NULL, ` +
            `  description TEXT NOT NULL ` +
            `); `
          );
        }
      ).then(
        () => {
          return standaloneQuery(
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
          return standaloneQuery(
            connectionString,
            `CREATE TABLE Users( ` +
            `  id          BIGSERIAL PRIMARY KEY NOT NULL, ` +
            `  user_name   TEXT NOT NULL, ` +
            `  first_name  TEXT, ` +
            `  last_name   TEXT, ` +
            `  email       TEXT UNIQUE NOT NULL, ` +
            `  birthdate   DATE, ` +
            `  hash        TEXT NOT NULL, ` +
            `  salt        TEXT NOT NULL, ` +
            `  created_at  TIMESTAMP NOT NULL, ` +
            `  role_id     INT NOT NULL ` +
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
