'use strict';
var user = require('../services/User.js');

module.exports = {
  getUserById: function(request, res) {
    user.getByJWT(request.swagger.params.Authorization, function(response) {
      return res.status(response.status).json(response);
    });
  }
}
