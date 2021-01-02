'use strict';
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:kd45UzTiPpcSHlSZ@cluster0.h6bgg.mongodb.net/eLearning?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

// import all file in this dir, except index.js
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("DB CONNECTED!")
});

module.exports = db;