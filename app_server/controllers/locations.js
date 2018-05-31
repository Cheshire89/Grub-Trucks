'use strict';

// Get 'home' page
module.exports.homelist = (req, res, next) => {
    res.render('locations-list', {
        title: 'Loc8r - find places to work with wifi near you!',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work with wifi near you!'
        },
        locations:[
            {
                name: 'Stella\'s',
                address: '1476 S Pearl St, Denver, CO 80210',
                rating: 5,
                facilities: ['Hot drinks', 'Wifi', 'Live Music'],
                distance: '100m'
            },
            {
                name: 'Café Ciboulette',
                address: '9660 E Alameda Ave Unit 107, Denver, CO 80247',
                rating: 5,
                facilities: ['Hot drinks', 'Food', 'Deserts', 'Wifi'],
                distance: '50m'
            },
            {
                name: 'Sonder Coffee & Tea',
                address: '9731 E Iliff Ave, Denver, CO 80231',
                rating: 3,
                facilities: ['Hot drinks', 'Wifi'],
                distance: '300m'
            }
        ]
    });
};

// Get 'Location info' page
module.exports.locationInfo = (req, res, next) => {
    res.render('location-info', { 
        title: 'Stella\'s',
        pageHeader: {
            title: 'Stella\'s'
        },
        about: {
            content: 'This cafe is here because they have outstanding selection and fast wifi. I personally love working from this caffe',
            callToAction: 'If you\'ve been and you like it - please leave a review to help other peopel like you'
        },
        location: {
            name: 'Stella\'s',
            address: '1476 S Pearl St, Denver, CO 80210',
            rating: 3,
            facilities: ['Hot drinks', 'Wifi', 'Live Music'],
            coords: [-104.980158, 39.689681],
            key: {
                clientSecret: 'LRmQIX1xlcPhEj6lFOw21o-MgMA',
                keySecret: 'AIzaSyBhXdSgJMV982NO9nc-YIWIlXTes0jZOI8',
                auth: this.clientSecret + '=' + this.keySecret
            },
            openingTimes: [
                {
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '5:00pm',
                    closed: false
                },
                {
                    days: 'Saturday',
                    opening: '9:00am',
                    closing: '3:00pm',
                    closed: false
                },
                {
                    days: 'Sunday',
                    closed: true
                }
            ],
            reviews: [
                {
                    author: 'Aleksandr Antonov',
                    timeStamp: '16 July 2018',
                    rating: 4,
                    review: 'What a great place! I can\'t say enought good things about it !'
                }
            ]
        }
    });
};

// Get 'Add review' page
module.exports.addReview = (req, res, next) => {
    res.render('location-review-form', {
        title: 'Add review',
        pageHeader: {
            title: 'Review Stella\'s'
        }
    }
    );
};