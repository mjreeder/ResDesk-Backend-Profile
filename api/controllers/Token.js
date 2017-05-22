'use strict';
var JWT = require('../services/JWT.js');
module.exports = {
  refreshToken: function(request, res) {
    var tokenResponse = JWT.refreshToken(request.swagger.params.Authorization, function(response){
      console.log(response);
      res.status(response.status).json(response);
    });
  },

  verifyToken: function(request, res) {
    JWT.verifyToken(request.swagger.params.Authorization, function(response) {
      res.status(response.status).json(response);
    });
  }

}
