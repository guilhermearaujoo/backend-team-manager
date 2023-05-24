import { Router } from 'express';
import clubeController from '../controllers/clube.controller';

const transactionsRouter = Router();

transactionsRouter.post('/', clubeController.create);
transactionsRouter.get('/', clubeController.list);

export default transactionsRouter;