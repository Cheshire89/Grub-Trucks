'use strict';

var mongose = require('mongose');
var Loc = mongose.model('Location');

module.exports.reviewsCreate = (req, res, next) => {

}

module.exports.reviewsReadOne = (req, res, next) => {

}

module.exports.reviewsUpdateOne = (req, res, next) => {

}

module.exports.reviewsDeleteOne = (req, res, next) => {

}

var sendJsonResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}