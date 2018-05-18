let express = require('express');
let router = express.Router();

let ctrlConfig = {
    path: '../controllers/'
}
let ctrlLocations = require(ctrlConfig.path + 'locations');
let ctrlOthers = require(ctrlConfig.path + 'others');

// Locations pages
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

// Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
