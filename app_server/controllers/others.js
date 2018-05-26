'use strict';

module.exports.about = (req, res, next) => {
    res.render('generic-text', { title: 'About' });
};