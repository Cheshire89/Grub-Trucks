'use strict';
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const Res = require('./shared');

let theEarth = (function () {
    let earthRadius = 6371; // km, miles is 3959

    let getDistanceFromRads = function(rads) {
      return parseFloat(rads * earthRadius);
    };

    let getRadsFromDistance = function(distance) {
      return parseFloat(distance / earthRadius);
    };

    return {
      getDistanceFromRads : getDistanceFromRads,
      getRadsFromDistance : getRadsFromDistance
    };
})();

module.exports.locationsCreate = (req, res, next) => {
}

module.exports.locationsListByDistance = (req, res, next) => {
    //http://localhost:4000/api/locations?lng=-104.98653&lat=39.732975&dist=20
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    let dist = parseFloat(req.query.dist) * 1000;

    let point = {
        type: 'Point',
        coordinates: [lng, lat]
    };

    Loc.aggregate([{
        $geoNear: {
            near: point,
            spherical: true,
            maxDistance: dist,
            distanceField: 'distance',
            // convert meters to miles
            distanceMultiplier: 0.000621,
            // max number of entries being returned
            num: 20
        },
    }, {
        //fields to be returned
        $project:{
            distance: true,
            name: true,
            address: true,
            rating: true,
            facilities: true
        }
    }]).then((results, stats) => {
        if (results.length > 0) {
            Res.sendJsonResponse(res, 200, results);
        } else {
            Res.sendJsonResponse(res, 404, {
                "message" : "No locations were found near your"
            });
        }
    }).catch((error) => {
        Res.sendJsonResponse(res, 404, error);
    });
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