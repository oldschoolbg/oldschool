'use strict'
const unauthorised_response = require('./responses').unauthorised_response;
const error_response = require('./responses').error_response;
const securityConfig = require('../../../config/security');
const jwt = require('jsonwebtoken');

module.exports = {
  is_authenticated : is_authenticated ,
  try_identify : try_identify
};

function is_authenticated(req, res, next) {
  // check header or url parameters or post parameters for token
  if (!req.user_id) {
    return new unauthorised_response(res);
  } else {
    next();
  }
};

function try_identify(req, res, next) {
  var token = req.headers['authorization'];
  if (!token) {
    next();
  } else {
    jwt.verify(token, securityConfig.jwt_hashing_secret, function(err, decoded) {
      if (!err) {
        // we have identified the user so save their id.
        req.user_id = decoded.id;
      }
      next();
    });
  }
};

