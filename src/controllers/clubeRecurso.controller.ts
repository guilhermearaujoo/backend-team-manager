import { Request, Response } from 'express';
import recursoService from '../services/recurso.service';
import clubeService from '../services/clube.service';
import mapStatusHTTP from '../utils/MapStatus.HTTP';

async function consumir(req: Request, res: Response) {
  const { 
    clube_id: clubeID, 
    recurso_id: recursoID,
    clubeSaldo,
    recursoSaldo,
  } = req.body;

  const consumirClube = await clubeService.consumir({
    id: clubeID,
    saldo_disponivel: clubeSaldo,
  });

  if (consumirClube.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(consumirClube.status)).json(consumirClube.data);  
  }

  const consumirRecurso = await recursoService.consumir({
    id: recursoID,
    saldo_disponivel: recursoSaldo,
  });

  if (consumirRecurso.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(consumirRecurso.status)).json(consumirRecurso.data);  
  }
  
  res.status(200).json({ 1: consumirRecurso.data, 2: consumirClube.data });
}

export default {
  consumir,
};