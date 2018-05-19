'use strict';

module.exports.about = (req, res, next) => {
    res.render('index', { title: 'About' });
};