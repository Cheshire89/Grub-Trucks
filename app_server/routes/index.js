let express = require('express');
let router = express.Router();

let ctrlConfig = {
    path: '../controllers/'
}
let ctrlLocations = require(ctrlConfig.path + 'locations');
let ctrlOthers = require(ctrlConfig.path + 'others');

// Locations pages
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationId', ctrlLocations.locationInfo);
router.get('/location/:locationId/review/new', ctrlLocations.addReview);
router.post('/location/:locationId/review/new', ctrlLocations.doAddReview);

// Other pages
router.get('/about', ctrlOthers.about);

module.exports = router;
