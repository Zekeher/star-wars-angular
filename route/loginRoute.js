'use strict'
var express = require('express');
var loginController = require('../controllers/loginControllers');

var api = express.Router();

api.post('/login', async (req, res) => {
    try {
        const result = await loginController.login(req.body);
        res.status(200).send({ msg: result.msg, status: result.status });
    } catch (error) {
        res.status(500).send({ msg: "Problemas con el servidor", status: false });
    }
});

module.exports = api;