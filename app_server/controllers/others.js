'use strict';

module.exports.about = (req, res, next) => {
    res.render('generic-text', { 
        title: 'About Loc8r',
        pageHeader: {
            title: 'About Loc8r'
        }
    });
};