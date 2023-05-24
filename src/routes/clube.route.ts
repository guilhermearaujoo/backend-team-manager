import { Router } from 'express';
import clubeController from '../controllers/clube.controller';

const transactionsRouter = Router();

transactionsRouter.post('/', clubeController.create);

export default transactionsRouter;