'use strict';

// Get 'home' page
module.exports.homelist = (req, res, next) => {
    res.render('locations-list', { title: 'Home' });
};

// Get 'Location info' page
module.exports.locationInfo = (req, res, next) => {
    res.render('location-info', { title: 'Location info' });
};

// Get 'Add review' page
module.exports.addReview = (req, res, next) => {
    res.render('index', { title: 'Add review' });
};