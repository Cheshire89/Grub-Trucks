'use strict';
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const Res = require('./shared');

module.exports.reviewsCreate = (req, res, next) => {

}

module.exports.reviewsReadOne = (req, res, next) => {
    if(req.params && req.params.locationId && req.params.reviewId){
        Loc
        .findById(req.params.locationId)
        .select('name reviews')
        .exec((error, location) => {
            // get location
            if (!location) {
                let response, review; 
                Res.sendJsonResponse(res, 404, {
                    "message" : "Location with provided ID is not found"
                });
                return;
            } else if (error) {
                Res.sendJsonResponse(res, 404, error);
                return;
            }
                // get review
                if (location.reviews && location.reviews.length > 0) {

                    let review = location.reviews.id(req.params.reviewId);
                    if (!review) {
                        Res.sendJsonResponse(res, 404, {
                            "message" : "[reviewId] not found"
                        });
                        return;
                    } else {
                        let response = {
                            location: {
                                name : location.name,
                                id : req.params.locationId
                            },
                            review : review
                        };
                        Res.sendJsonResponse(res, 200, response);
                        return;
                    }
                } else {
                    Res.sendJsonResponse(res, 404, {
                        "message" : "No reviews found"
                    });
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

module.exports.reviewsUpdateOne = (req, res, next) => {

}

module.exports.reviewsDeleteOne = (req, res, next) => {

}
