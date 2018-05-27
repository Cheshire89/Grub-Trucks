require('./location');
var mongoose = require('mongoose');
var dbName = 'Loc8r';
var dbURI = 'mongodb://localhost/' + dbName;
var liveDb = {
    username: 'heroku_8m0qsfb8',
    password: 'h0kq6j97qsdos2o1lk7aa4nq8f',
    server: 'ds137740.mlab.com:37740',
    db_name: 'heroku_8m0qsfb8',
}


mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to: ' + dbURI);
});

mongoose.connection.on('error', function (error) {
    console.log('Mongoose connected error: ' + error);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});


var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through: ' + msg);
        callback();
    });
}

//For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    });
});

//For app termination
process.once('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

//For heroku termination
process.once('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});