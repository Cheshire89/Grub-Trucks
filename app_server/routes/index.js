let express = require('express');
let router = express.Router();
let ctrlMain = require('../controllers/main.js');

/* GET home page. */


router.get('/', ctrlMain.index);

module.exports = router;
