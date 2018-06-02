'use strict';

var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

module.exports.locationsCreate = (req, res, next) => {
}

module.exports.locationsListByDistance = (req, res, next) => {
}

module.exports.locationsReadOne = (req, res, next) => {
    sendJsonResponse(res, 200, {"status":"success"});

}

module.exports.locationsUpdateOne = (req, res, next) => {

}

module.exports.locationsDeleteOne = (req, res, next) => {

}

var sendJsonResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}