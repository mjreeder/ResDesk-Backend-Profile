var key = sails.config.jwt.key;
var nJwt = require('njwt');
var moment = require('moment');
var responseFormater = require('../../helpers/format-response.js');
var request = require('request');

var parseTokenFromHeader = function (authHeader) {

  var split = authHeader.value.split(" ");

  return split[1];
};

var getUserFromDirectory = function (tokenModel) {

  var getUserFromDirectoryPromise = new Promise(function (resolve, reject) {

    var userId = tokenModel[0].user_id;

    request.get({
      url: "http://localhost:10011/students/" + userId
    }, function (error, response, body) {
      if (error) {

        reject(error);
      } else {

        body = JSON.parse(body);

        if (body.status != 200) {
          reject(body);
          return;
        }

        resolve(body);
      }
    });
  });

  return getUserFromDirectoryPromise;
}


module.exports = {

  getByJWT: function (authHeader, callback) {

    var tokenFromHeader = parseTokenFromHeader(authHeader);

    var verifyTokenPromise = new Promise(function (resolve, reject) {
      nJwt.verify(tokenFromHeader, key, function (err, verifiedToken) {
        if (err) {
          reject(err);
        } else {
          resolve(verifiedToken);
        }
      });
    });

    verifyTokenPromise.then(function (response) {
      //success
      Token.find({
        token: tokenFromHeader
      }).exec(function (err, tokenMatched) {
        if (err) {
          callback(responseFormater.fail("Token Not Found in database", err, 401));
        } else {

          getUserFromDirectory(tokenMatched).then(function (response) {
            console.log(tokenMatched);

            var data = response.data;
            switch (data[0].position) {
            case "Desk Staff":
              data[0].position = 'staff';
              break;
            case 'Administrative Assistant (AA)':
              data[0].position = 'admin';
            default:
              data[0].position = 'staff';
            }
            callback(responseFormater.success("User Found", data, 200));
          }, function (error) {
            callback(responseFormater.fail("error finding the user", err, 404));
          });
        }
      });
    }, function (error) {
      callback(responseFormater.fail(error.message, error, 401));
    });
  }

}
