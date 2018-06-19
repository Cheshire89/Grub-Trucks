'use strict';
let request = require('request');

let apiOptions = {
    server: 'http://localhost:4000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://whispering-eyrie-73797.herokuapp.com';
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

let _showError = (req, res, status) => {
    let title, content;
    if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Looks like we can\'t find this page. Sorry';
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('error-page', {
        title : title,
        content : content
    });
};

let renderHomepage = (req, res, responseBody) => {
    let renderObj = {
        title: 'GrubTrucks - find food trucks near you!',
        pageHeader: {
            title: 'GrubTrucks',
            strapLine: 'find food trucks near you!'
        },
        locations: responseBody
    };

    if (responseBody.success === false) {
        renderObj.error = {
            message: responseBody.message,
            statusCode: responseBody.statusCode
        };
    };
    res.render('locations-list', renderObj);
};

let renderDetailPage = (req, res, locDetail) => {
    let renderObj = { 
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        about: {
            content: 'This cafe is here because they have outstanding selection and fast wifi. I personally love working from this caffe',
            callToAction: 'If you\'ve been and you like it - please leave a review to help other peopel like you'
        },
        location: locDetail  
    };

    renderObj.location.key = {
            keySecret: 'AIzaSyBhXdSgJMV982NO9nc-YIWIlXTes0jZOI8'
    }

    res.render('location-info', renderObj);
}

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
            if (response.statusCode === 200 && data.length) {
                for(i=0;i<data.length; i++){
                    data[i].distance = _formatDistance(data[i].distance);
                }
            }
            renderHomepage(req, res, data);

        }
    );
};


// Get 'Location info' page
module.exports.locationInfo = (req, res) => {
    const path = '/api/locations/' + req.params.locationId;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    
    request(
        requestOptions,
        (err, response, body) => {
            let data = body;
            if (response.statusCode === 200) {
                data.coords = {
                    lng : body.coords[0],
                    lat : body.coords[1]
                };
                renderDetailPage(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
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

