const express = require('express');
const ControladorONG = require('./controladores/ControladorONG');
const ControladorCaso = require('./controladores/ControladorCaso');
const ProfileControl = require('./controladores/ProfileControl');
const ControladorLogin = require('./controladores/ControladorLogin');

const routes = express.Router();

routes.post('/login', ControladorLogin.create);

routes.get('/ongs', ControladorONG.index);
routes.post('/ongs', ControladorONG.create);

routes.get('/casos', ControladorCaso.index);
routes.post('/casos', ControladorCaso.create);
routes.delete('/casos/:id', ControladorCaso.delete);

routes.get('/profile', ProfileControl.index);

module.exports = routes;