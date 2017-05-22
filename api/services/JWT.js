var key = sails.config.jwt.key;
var nJwt = require('njwt');
var moment = require('moment');
var responseFormater = require('../../helpers/format-response.js');

var parseTokenFromHeader = function(authHeader) {

  var split = authHeader.value.split(" ");

  return split[1];
};

var updateToken = function(token) {

  var updateTokenPromise = new Promise(function(resolve, reject) {

    Token.update({
      token: token
    }, {
      token: token
    }).exec(function(err, result) {
      if (err) {
        reject(responseFormatter.fail("error creating JWT", null, 500));
      } else {
        resolve(token);
      }
    });
  });

  return updateTokenPromise;
};

module.exports = {

  verifyToken: function(authHeader, callback) {
    var token = parseTokenFromHeader(authHeader);
    nJwt.verify(token, key, function(err, token) {

      if (err) {
        callback(responseFormater.fail(err.message, err, 401));
      } else {
        callback(responseFormater.success("Verified", token, 200));
      }
    });
  },

  deleteToken: function(authHeader, callback) {
    var token = parseTokenFromHeader(authHeader);
    Token.destroy({
      token: token
    }).exec(function(err) {
      if (err) {
        callback(responseFormater.fail("error destroying token", null, 500));
      } else {
        callback(responseFormater.success("Successful logout", null, 200));
      }
    });

  },
  // TODO change last else to throw error on production
  createToken: function(queryParam) {
    var claims;
    var auth = queryParam.q;
    var tokenModel;
    var token;
    if (sails.config.environment !== 'production') {
      if (auth === 'test.user') {
        claims = {
          sub: '000000000',
          name: {
            first: 'linus',
            last: 'van pelt'
          },
          email: 'testEmail',
          iss: 'http://localhost:10018',
          permissions: {
            roles: ['staff'],
            halls: ['testHall']
          }
        };
        var jwt = nJwt.create(claims, key);
        jwt.setExpiration(moment().add(8, 'hours'));

        token = jwt.compact();
        tokenModel = {
          'token': token,
          'user_id': 0
        };
      } else if (auth == 'test.admin') {
        claims = {
          sub: '000000001',
          name: {
            first: 'admin',
            last: 'groff'
          },
          email: 'bgroff@bsu.edu',
          iss: 'http://localhost:10018',
          permissions: {
            roles: ['admin'],
            halls: ['testHall']
          }
        };
        var jwt = nJwt.create(claims, key);
        jwt.setExpiration(moment().add(8, 'hours'));

        token = jwt.compact();
        tokenModel = {
          'token': token,
          'user_id': 1
        };
      } else {
        return null;
      }
    } else {
      //Lookup user in Directory service
      claims = {
        sub: '900889179',
        name: {
          first: 'user',
          last: 'lastname'
        },
        email: 'testEmail',
        iss: 'http://localhost:10018',
        permissions: {
          roles: ['staff'],
          halls: ['testHall']
        }
      };
      var jwt = nJwt.create(claims, key);
      jwt.setExpiration(moment().add(8, 'hours'));

      token = jwt.compact();
      tokenModel = {
        'token': token,
        'user_id': 900889179
      };
    }

    var insertTokenPromise = new Promise(function(resolve, reject) {
      Token.create(tokenModel).exec(function(err, result) {
        if (err) {
          reject(responseFormater.fail("error creating JWT", err, 500));
        } else {
          resolve(token);
        }
      });
    });

    return insertTokenPromise;
  },

  refreshToken: function(authHeader, callback) {
    var token = parseTokenFromHeader(authHeader);
    var verifyTokenPromise = new Promise(function(resolve, reject) {
      nJwt.verify(token, key, function(err, verifiedToken) {
        if (err) {
          reject(err);
        } else {
          verifiedToken = verifiedToken.setExpiration(moment().add(8, 'hours'));
          resolve(verifiedToken);
        }
      });
    });

    verifyTokenPromise.then(function(response) {
      updateToken(response).then(function(res) {
        callback(responseFormater.success("token refresh success", res, 200));
      }, function(error) {
        callback(responseFormater.fail("failed to update token", error, 500));
      });
    }, function(error) {
      callback(responseFormater.fail("failed to verify token you were trying to refresh", error, 500));
    });

  }
}
