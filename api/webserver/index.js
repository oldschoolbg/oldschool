'use strict';
const express = require('express');
const try_identify = require('./shared').guards.try_identify;
const authenticated_guard = require('./shared').guards.authenticated_guard;


var app = module.exports = express();

app.use(try_identify);

app.get('*', function (req, res, next) {
  res.status(404).json({
    success: false,
    message: "Not a valid route"
  });
});