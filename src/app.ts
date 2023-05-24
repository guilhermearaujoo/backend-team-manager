import express from 'express';
import clubeRouter from './routes/clube.route';
import clubeRecursoRouter from './routes/clubeRecurso.route';

const app = express();

app.use(express.json());

app.use('/clubes', clubeRouter);
app.use('/consumir', clubeRecursoRouter);

export default app;