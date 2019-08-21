// const { Router } = require('express');
// By using the module "sucrase" you can use the syntaxe "import" instead of variable
// declaration for importing modules
import { Router } from 'express';
// import multer from 'multer';
import StatusController from './app/controllers/StatusController';
// import multerConfig from './config/multer';


const routes = new Router();
// const upload = multer(multerConfig);

// /////////////////////////////////////////////////////////////////////////////
// Status Routes
routes.get('/status', StatusController.index); // Load all Status
routes.get('/status/:id', StatusController.index); // Load Status by id
routes.post('/status', StatusController.store); // Save a Status
routes.put('/status/:id', StatusController.update); // Update an Status by id
routes.delete('/status/:id', StatusController.delete); // Remove an Status by id


export default routes;
