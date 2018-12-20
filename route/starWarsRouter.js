'use strict'
let express = require('express');
let StarwarsControllers = require('../controllers/starwarsControllers');
let ImgControllers = require('../controllers/imgControllers');
let api = express.Router();

api.get('/starwars', async (req, res) => {
    try {
        const result = await StarwarsControllers.getAll();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});
api.get('/starwars/:name', async (req, res) => {
    try {
        const result = await StarwarsControllers.getOnePj(req.params);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});
api.post('/starwars/update', async (req, res) => {
    try {
        const result = await StarwarsControllers.setOnePj(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});
api.post('/starwars/create', async (req, res) => {
    try {
        const result = await StarwarsControllers.createOnePj(req.body);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});
api.delete('/starwars/:name', async (req, res) => {
    try {
        const result = await StarwarsControllers.deleteOnePj(req.params);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error });
    }
});

api.get('/starwars/img/:name', ImgControllers.getImageFile);

module.exports = api;