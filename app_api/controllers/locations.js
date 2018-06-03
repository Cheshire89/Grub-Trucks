'use strict';
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const Res = require('./shared');

module.exports.locationsCreate = (req, res, next) => {
}

module.exports.locationsListByDistance = (req, res, next) => {
}

module.exports.locationsReadOne = (req, res, next) => {
    if(req.params && req.params.locationId){
        Loc
        .findById(req.params.locationId)
        .exec((error, location) => {
            if(!location){
                Res.sendJsonResponse(res, 404, {
                    "message" : "Location with provided ID is not found"
                });
                return;
            } else if (error) {
                Res.sendJsonResponse(res, 404, error);
                return;
            }
            Res.sendJsonResponse(res, 200, location);
            return;
        });
    } else {
        Res.sendJsonResponse(res, 404, {
            "message" : "No [locationId] in request"
        });
    }
}

module.exports.locationsUpdateOne = (req, res, next) => {

}

module.exports.locationsDeleteOne = (req, res, next) => {

}