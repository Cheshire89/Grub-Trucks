'use strict';

var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    timeStamp: {type: Date, "default": Date.now},
    rating: {type: Number, "default": 0, min: 0, max: 5, required: true},
    review: {type: String, required: true}
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere', required: true},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);