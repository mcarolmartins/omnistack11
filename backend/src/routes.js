const express = require('express');

//fazer validacao
const { Joi, celebrate, Segments } = require('celebrate'); 


const ControladorONG = require('./controladores/ControladorONG');
const ControladorCaso = require('./controladores/ControladorCaso');
const ProfileControl = require('./controladores/ProfileControl');
const ControladorLogin = require('./controladores/ControladorLogin');

const routes = express.Router();

routes.post('/login', ControladorLogin.create);

routes.get('/ongs', ControladorONG.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    }),
}), ControladorONG.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        autorizacao: Joi.string().required(),
    }).unknown(),
}), ProfileControl.index);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), ControladorCaso.index);


routes.post('/casos', ControladorCaso.create);
routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), ControladorCaso.delete);

module.exports = routes;