'use strict'
const angular_pkg = require('../../../../package.json');
//const ERROR_LOGGING = require('../../../core/system/logging').logError

module.exports = {
  error_response : error_response,
  created_response : created_response,
  success_response : success_response,
  not_found_response : not_found_response,
  paged_success_response : paged_success_response,
  unauthorised_response : unauthorised_response
};

function unauthorised_response(res) {
  add_headers(res);
  return res.status(403).json({
    success: false,
    message: "You do not have permission to do that"
  });
};

function not_found_response(res) {
  add_headers(res);
  return res.status(404).json({
    success: false,
    message: "That cannot be found"
  });
};

function error_response(err, res, metadata) {
  console.log(err);
  /*ERROR_LOGGING(res.req.originalUrl, {
    message: err.message,
    stack: err.stack
  })
  .then(() => {*/
    return res.status(500).json({
      success: false,
      message: _fettle_error(err, metadata).message
    });
  /*})
  .catch((e) => {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: _fettle_error(err, metadata).message
    });
  });*/
};

function created_response(result, res) {
  add_headers(res);
  return res.status(201).json({
    success: true,
    result: result
  });
};
function success_response(result, res) {
  add_headers(res);
  return res.status(200).json({
    success: true,
    result: result
  });
};
function paged_success_response(result, pager, res) {
  add_headers(res);
  return res.status(200).json({
    success: true,
    result: result,
    pager : pager
  });
};

function add_headers(res) {
  res.setHeader('Access-Control-Expose-Headers', 'package-version');
  res.setHeader('package-version', angular_pkg.version);
};

function _fettle_error(err, metadata) {
  if (!err.code) {
    return err;
  }
  switch (err.code) {
    case '23503':
      return new Error("That " + metadata.object_type + " is in use elsewhere in the system and therefore cannot be deleted.");  
    default:
      return err;
  }
};