import { Router } from 'express';
import clubeController from '../controllers/clube.controller';

const clubeRouter = Router();

clubeRouter.get('/', clubeController.list);
clubeRouter.post('/', clubeController.create);

export default clubeRouter;