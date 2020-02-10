const express = require('express');

const UserController = require('./controllers/UserController');
const ImmobileController = require('./controllers/ImmobileController');

const routes = express.Router();

routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

routes.get('/immobile', ImmobileController.index);
routes.post('/immobile', ImmobileController.store);

module.exports = routes;