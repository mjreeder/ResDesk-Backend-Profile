'use strict';

module.exports = {
  processBsuLogin: function(request, response) {
//    request.swagger.params.name.value
    console.log('SHIBBOLETH');

    //TODO: Perform decryption
    return response.redirect(302, '../login');
  }
}