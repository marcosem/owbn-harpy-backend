// const { Router } = require('express');
// By using the module "sucrase" you can use the syntaxe "import" instead of variable
// declaration for importing modules
import { Router } from 'express';
// import multer from 'multer';
import StatusController from './app/controllers/StatusController';
import PositionsController from './app/controllers/PositionsController';
import StatusPositionController from './app/controllers/StatusPositionController';
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

// /////////////////////////////////////////////////////////////////////////////
// Positions Routes
routes.get('/positions', PositionsController.index); // Load all Positions
routes.get('/positions/:id', PositionsController.index); // Load Position by id
routes.post('/positions', PositionsController.store); // Save a Position
routes.put('/positions/:id', PositionsController.update); // Update an Position by id
routes.delete('/positions/:id', PositionsController.delete); // Remove an Position by id

// /////////////////////////////////////////////////////////////////////////////
// Status-Positions Routes
routes.get('/positionstatus', StatusPositionController.index); // Load all StatusPositions
routes.get('/positionstatus/:id', StatusPositionController.index); // Load StatusPositions by id
routes.post('/positionstatus', StatusPositionController.store); // Save a StatusPositions
routes.put('/positionstatus/:id', StatusPositionController.update); // Update an StatusPositions by id
routes.delete('/positionstatus/:id', StatusPositionController.delete); // Remove an StatusPositions by id

export default routes;
