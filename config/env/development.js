/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  //TODO: Increment this per service
  port: 10018,

  jwt: {
    key: "AB10A0790E9E31676AD5B20DF70F31D315DCE68F3BABD32509C30F9047EEE5D0"
  }

  // models: {
  //   connection: 'someMongodbServer'
  // }

};
