#!/usr/bin/env node

const express = require('express');
const morgan = require('morgan');
const appConfig = require('./config/app.json');
const dbConfig = require('./config/database.json');
const database = require('./app/database');

database.connect(dbConfig, null).then(() => {

    let app = express();

    app.use(morgan('combined'));
    app.set('trust proxy', 1);
    app.set('views', './app/views/game');
    app.use('/', require('./app/middleware'));
    app.use('/', require('./app/controllers'));

    app.listen(appConfig.app_port, () => {
        console.log("CTFort Ready!")
    });
}).catch((error) => {
    console.log(`Error connecting to database: ${error}`);
    process.exit(1);
});
