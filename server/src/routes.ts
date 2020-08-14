import express from 'express';
import { celebrate, Joi } from 'celebrate'

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';


const routes = express.Router();    // Serve para desacoplar as minhas rotas do arquivo principal
// para um outro arquivo. Então o routes funciona de mesma forma que o app funciona.

const upload = multer(multerConfig)

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

//image...
routes.get('/points', pointsController.index); // Para listar
routes.get('/points/:id', pointsController.show);
routes.post(
    '/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);

// Agora exporto as as rotas de dentro desse arquivo 
// para ter acesso a elas  dentro do meu 'serve' 
export default routes;