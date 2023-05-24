import { Router } from 'express';
import clubeRecursoController from '../controllers/clubeRecurso.controller';
import consumirMiddleware from '../middlewares/consumir.middleware';

const recursoRouter = Router();

recursoRouter.post('/', consumirMiddleware.validateConsumo, clubeRecursoController.consumir);

export default recursoRouter;