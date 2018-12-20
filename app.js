'use strict'
var express = require('express');
var path = require('path')
var bodyParser = require('body-parser');
var starwars = require('./route/starWarsRouter');
var login = require('./route/loginRoute');
var app = express();

// Configuracion para parsear el body a json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// seteamos el header para el CORS
app.use((rep, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas
app.use('/api', login);
app.use('/api', starwars);

module.exports = app;