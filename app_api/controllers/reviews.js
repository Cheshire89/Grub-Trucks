'use strict';
const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const Res = require('./shared');

module.exports.reviewsCreate = (req, res, next) => {
    let locationId = req.params.locationId;
    if (locationId) {
        Loc
            .findById(locationId)
            .select('reviews')
            .exec((error, location) => {
                if (error) {
                    Res.sendJsonResponse(res, 400, error);
                } else {
                    doAddReview(req, res, location);
                }
            });
    } else {
        Res.sendJsonResponse(res, 404, {
            "message" : "Not found, [locationId] required"
        });
    }
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

let doAddReview = (req, res, location) => {
    if (!location) {
        Res.sendJsonResponse(res, 404, {
            "message" : "Not found, [locationId] required"
        });
    } else {
       location.reviews.push({
           author: req.body.author,
           rating: req.body.rating,
           review: req.body.review
       });
       location.save((error, location) => {
           if (error) {
               Res.sendJsonResponse(res, 400, error);
            } else {
                updateAverageRating(location._id);
                let thisReview = location.reviews[location.reviews.length -1];
                Res.sendJsonResponse(res, 201, thisReview);
           }
       }) 
    }
};

let updateAverageRating = (locationId) => {
    Loc
        .findById(locationId)
        .select('rating reviews')
        .exec((error, location) => {
            if (error) {
                Res.sendJsonResponse(res, 400, error);
            } else {
                doSetAverageRating(location);
            }
        });
};

let doSetAverageRating = (location) => {
    let i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal += location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save((error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Average rating updated to', ratingAverage);
            }
        });
    }
};
