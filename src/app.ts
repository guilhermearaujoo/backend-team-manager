import express from 'express';
import clubeRouter from './routes/clube.route';

const app = express();

app.use(express.json());

app.use('/clubes', clubeRouter);

export default app;