const User = require('../models/schemas/user');
const jwt = require('jwt-simple');
const config = require('../models/config');

exports.loginUser = function(req, res, next) {
};

exports.adminRequired = function(req, res, next) {
};

exports.superAdminRequired = function(req, res, next) {
};
