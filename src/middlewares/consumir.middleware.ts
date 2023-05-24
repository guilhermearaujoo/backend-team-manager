import { Request, Response, NextFunction } from 'express';
import recursoService from '../services/recurso.service';
import clubeService from '../services/clube.service';
import mapStatusHTTP from '../utils/MapStatus.HTTP';
import mapMessages, { MessageType } from '../utils/MapMessages';
import validateConsumir from './validations/validateConsumir';

async function validateConsumo(req: Request, res: Response, next: NextFunction) {
  const { 
    clube_id: clubeID, 
    recurso_id: recursoID,
    valor_consumo: valorConsumo,
  } = req.body;

  const notAllowConsumo = validateConsumir({ 
    clube_id: clubeID, recurso_id: recursoID, valor_consumo: valorConsumo,
  });

  if (notAllowConsumo) {
    return res.status(mapStatusHTTP('INVALID_DATA')).json({ message: notAllowConsumo });   
  }

  const recursoResponse = await recursoService.getRecurso(recursoID);

  if (recursoResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(recursoResponse.status)).json(recursoResponse.data);  
  }

  const clubeResponse = await clubeService.getClube(clubeID);

  if (clubeResponse.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(clubeResponse.status)).json(clubeResponse.data);  
  }

  const recursoSaldoDisponivel = recursoResponse.data.dataValues.saldo_disponivel;
  const newRecursoSaldoDisponivel = recursoSaldoDisponivel - valorConsumo;

  if (newRecursoSaldoDisponivel < 0) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json(mapMessages(MessageType.SALDO_RECURSO_INSUFICIENT));   
  }

  const clubeSaldoDisponivel = clubeResponse.data.dataValues.saldo_disponivel;
  const newClubeSaldoDisponivel = clubeSaldoDisponivel - valorConsumo;

  if (newClubeSaldoDisponivel < 0) {
    return res.status(mapStatusHTTP('INVALID_DATA'))
      .json(mapMessages(MessageType.SALDO_CLUBE_INSUFICIENT));   
  }
  
  req.body.clubeSaldo = newClubeSaldoDisponivel;
  req.body.recursoSaldo = newRecursoSaldoDisponivel;
  next();
}

export default {
  validateConsumo,
};