'use strict';
var JWT = require('../services/JWT.js');

module.exports = {
  processLogin: function(request, response) {
    var token = JWT.createToken(request.query);
    if(token == null){
      return response.badRequest();
    }

    token.then(function (res) {
      return response.redirect(302, 'http://localhost:8080/login?token=' + res);
    }, function (error) {
      console.log(error);
    });

  },

  processLogout: function(request, res) {
    JWT.deleteToken(request.swagger.params.Authorization, function(response) {
      return res.status(response.status).json(response);
    });
  }

}
