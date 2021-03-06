/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  //TODO: Make sure this is 8080
  port: 8080,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  jwt: {
    key: "7234B76F15E986B96FB6F673C55F229EFFB4CEAF66BE89B21902D97031BE3831"
  }

  // log: {
  //   level: "silent"
  // }

};
