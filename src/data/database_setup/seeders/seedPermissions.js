'use strict';

const queries = require('../../utility/queries');

module.exports = function seedPermissions(connectionString) {
  return new Promise(
    (resolve, reject) => {
      queries.simple(
        connectionString,
        `INSERT INTO Roles ` +
        `VALUES ` +
        `('batman', 'In charge of all of it.'), ` +
        `('admin', 'Administrator. Has access to features required to run the site.'), ` +
        `('moderator', 'Community manager. Has elevated permissions, albiet in a limited fashion.'), ` +
        `('contributor', 'Content contributor. Has permissions for content addition/creation.'), ` +
        `('user', 'Standard user. Basic permissions elevated somewhat above anonymous access.'), ` +
        `('anonymous', 'Anonymous access. Limited permissions for non-logged in users.');`
      ).then(
        () => {
          /*
           *  Permissions are grouped into three categories. By application feature,
           *  by action type, and by system actions
           */
          return queries.simple(
            connectionString,
            `INSERT INTO Permissions ` +
            `VALUES ` +
            /* feature permissions */
              // N/A (no features yet)
            /* action permissions */
            `('create_comment', 'Permission to create comments on content.'), ` +
            `('create_article', 'Permission to create new articles.'), ` +
            `('read_own_comment', 'Permission to read own comments.'), ` +
            `('read_other_comment', 'Permission to read other users comments.'), ` +
            `('read_own_article', 'Permission to read own articles.'), ` +
            `('read_other_article', 'Permission to read other users articles.'), ` +
            `('edit_own_comment', 'Permission to edit comments created by the user.'), ` +
            `('edit_own_article', 'Permission to edit articles created by the user.'), ` +
            `('edit_other_comment', 'Permission to edit comments made by others.'), ` +
            `('edit_other_article', 'Permission to edit articles made by others.'), ` +
            `('flag_comment_moderation', 'Permission to flag a comment for moderation.'), ` +
            `('flag_article_moderation', 'Permission to flag a article for moderation.'), ` +
            `('flag_comment_deletion', 'Permission to flag a comment for moderation.'), ` +
            `('flag_article_deletion', 'Permission to flag a article for moderation.'), ` +
            `('delete_own_comment', 'Permission to delete comments created by the user.'), ` +
            `('delete_own_article', 'Permission to delete articles created by the user.'), ` +
            `('delete_other_comment', 'Permission to delete comments created by others.'), ` +
            `('delete_other_article', 'Permission to delete articles created by others.'), ` +
            `/* system permissions */ ` +
            `('invalidate_cache', 'Permission to manually clear the application cache'), ` +
            `('create_user', 'Permission to create new user accounts'), ` +
            `('create_contributor', 'Permission to create new user accounts'), ` +
            `('create_moderator', 'Permission to create new user accounts'), ` +
            `('create_admin', 'Permission to create new user accounts');`
              // No-one has permission to create batman
          );
        }
      ).then(
        () => {
          return queries.simple(
            connectionString,
            `INSERT INTO RolePermissions ` +
            `VALUES ` +
            `('batman', 'create_comment'), ` +
            `('batman', 'create_article'), ` +
            `('batman', 'read_own_comment'), ` +
            `('batman', 'read_own_article'), ` +
            `('batman', 'read_other_comment'), ` +
            `('batman', 'read_other_article'), ` +
            `('batman', 'edit_own_comment'), ` +
            `('batman', 'edit_own_article'), ` +
            `('batman', 'edit_other_comment'), ` +
            `('batman', 'edit_other_article'), ` +
            `('batman', 'delete_own_comment'), ` +
            `('batman', 'delete_own_article'), ` +
            `('batman', 'delete_other_comment'), ` +
            `('batman', 'delete_other_article'), ` +
            `('batman', 'invalidate_cache'), ` +
            `('batman', 'create_user'), ` +
            `('batman', 'create_contributor'), ` +
            `('batman', 'create_moderator'), ` +
            `('batman', 'create_admin'), ` +
            `('batman', 'flag_comment_moderation'), ` +
            `('batman', 'flag_article_moderation'), ` +
            `('batman', 'flag_comment_deletion'), ` +
            `('batman', 'flag_article_deletion'), ` +
            `('admin', 'create_comment'), ` +
            `('admin', 'create_article'), ` +
            `('admin', 'read_own_comment'), ` +
            `('admin', 'read_own_article'), ` +
            `('admin', 'read_other_comment'), ` +
            `('admin', 'read_other_article'), ` +
            `('admin', 'edit_own_comment'), ` +
            `('admin', 'edit_own_article'), ` +
            `('admin', 'edit_other_comment'), ` +
            `('admin', 'edit_other_article'), ` +
            `('admin', 'delete_own_comment'), ` +
            `('admin', 'delete_own_article'), ` +
            `('admin', 'delete_other_comment'), ` +
            `('admin', 'delete_other_article'), ` +
            `('admin', 'invalidate_cache'), ` +
            `('admin', 'create_user'), ` +
            `('admin', 'create_contributor'), ` +
            `('admin', 'create_moderator'), ` +
            `('admin', 'flag_comment_moderation'), ` +
            `('admin', 'flag_article_moderation'), ` +
            `('admin', 'flag_comment_deletion'), ` +
            `('admin', 'flag_article_deletion'), ` +
            `('moderator', 'create_comment'), ` +
            `('moderator', 'create_article'), ` +
            `('moderator', 'read_own_comment'), ` +
            `('moderator', 'read_own_article'), ` +
            `('moderator', 'read_other_comment'), ` +
            `('moderator', 'read_other_article'), ` +
            `('moderator', 'edit_own_comment'), ` +
            `('moderator', 'edit_own_article'), ` +
            `('moderator', 'edit_other_comment'), ` +
            `('moderator', 'edit_other_article'), ` +
            `('moderator', 'create_user'), ` +
            `('moderator', 'flag_comment_moderation'), ` +
            `('moderator', 'flag_article_moderation'), ` +
            `('moderator', 'flag_comment_deletion'), ` +
            `('moderator', 'flag_article_deletion'), ` +
            `('user', 'create_comment'), ` +
            `('user', 'create_article'), ` +
            `('user', 'read_own_comment'), ` +
            `('user', 'read_own_article'), ` +
            `('user', 'read_other_comment'), ` +
            `('user', 'read_other_article'), ` +
            `('user', 'edit_own_comment'), ` +
            `('user', 'edit_own_article'), ` +
            `('user', 'flag_comment_moderation'), ` +
            `('user', 'flag_article_moderation'), ` +
            `('anonymous', 'create_comment'), ` +
            `('anonymous', 'read_own_comment'), ` +
            `('anonymous', 'read_other_comment'), ` +
            `('anonymous', 'read_other_article'), ` +
            `('anonymous', 'edit_own_comment');`
          );
        }
      ).then(
        () => {
          resolve('Roles and permissions seeded');
        }
      ).catch(
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    }
  );
};

