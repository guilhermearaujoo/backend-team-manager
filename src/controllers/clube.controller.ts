import { Request, Response } from 'express';
import clubeService from '../services/clube.service';

async function create(req: Request, res: Response) {
  const { clube, saldoDisponivel } = req.body;
  const createdClube = await clubeService.create({ clube, saldoDisponivel });
  res.status(201).json(createdClube);
}

export default {
  create,
};