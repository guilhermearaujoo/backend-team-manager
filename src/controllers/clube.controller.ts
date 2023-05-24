import { Request, Response } from 'express';
import clubeService from '../services/clube.service';
import mapStatusHTTP from '../utils/MapStatus.HTTP';

async function create(req: Request, res: Response) {
  const { clube, saldo_disponivel: saldoDisponivel } = req.body;

  const serviceResponse = await clubeService.create({ clube, saldo_disponivel: saldoDisponivel });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }

  res.status(200).json('ok');
}

async function list(_req: Request, res: Response) {
  const serviceResponse = await clubeService.list();
  
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);  
  }
  
  res.status(200).json(serviceResponse.data);
}

export default {
  create,
  list,
};