'use strict';
let request = require('request');
let apiOptions = {
    server: 'http://localhost:4000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = process.env.MONGODB_URI;
}

let _formatDistance = (distance) => {
    let numDistance, unit;
    unit = 'm';
    if (distance > 1000) {
        numDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    } else {
        numDistance = Math.floor(distance)
    }
    return numDistance + unit;
};

let renderHomepage = (req, res, responseBody) => {
    res.render('locations-list', {
        title: 'Loc8r - find places to work with wifi near you!',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find places to work with wifi near you!'
        },
        locations: responseBody
    });
};

// Get 'home' page
module.exports.homelist = (req, res) => {
    let requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {},
        qs: {
            lng: -104.881283,
            lat: 39.684565,
            dist: 20
        }
    };

    request(
        requestOptions,
        function (err, response, body) {
            let i, data;
            data = body;
            console.log(body);
            for(i=0;i<data.length; i++){
                data[i].distance = _formatDistance(data[i].distance);
            }
            renderHomepage(req, res, data);

        }
    );
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
            coords: [-104.980142, 39.689702],
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

