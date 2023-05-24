import RecursoModel, {
  RecursoSequelizeModel,
} from '../database/models/recurso.model';

import { ServiceResponse } from '../types/ServiceResponse';
import { Update } from '../types/Update';
import { Consumir } from '../types/Consumir';

import validateUpdate from './validations/validateUpdateFields';
import validateId from './validations/validateId';

import mapMessages, { MessageType } from '../utils/MapMessages';

async function getRecurso(
  id: number,
): Promise<ServiceResponse<RecursoSequelizeModel>> {
  let responseService: ServiceResponse<RecursoSequelizeModel>;

  const error = validateId(id);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  try {
    const recurso = await RecursoModel.findByPk(id);
    if (!recurso) {
      return {
        status: 'INVALID_DATA',
        data: { message: mapMessages(MessageType.RECURSO_NOT_FOUND) },
      };
    }

    responseService = { status: 'SUCCESSFUL', data: recurso };
  } catch (err: any) {
    responseService = {
      status: 'INVALID_DATA',
      data: { message: err.message },
    };
  }

  return responseService;
}

async function updateRecurso(
  transaction: Update,
): Promise<ServiceResponse<RecursoSequelizeModel>> {
  let responseService: ServiceResponse<RecursoSequelizeModel>;

  const error = validateUpdate(transaction);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const recurso = await getRecurso(transaction.id);
  responseService = recurso;

  if (recurso.status === 'SUCCESSFUL') {
    await RecursoModel.update(
      { saldo_disponivel: transaction.saldo_disponivel },
      { where: { id: transaction.id } },
    );

    const updatedRecurso = await getRecurso(transaction.id);
    if (updatedRecurso.status === 'SUCCESSFUL') {
      responseService = { status: 'SUCCESSFUL', data: updatedRecurso.data };
    }
  }
  return responseService;
}

async function consumir(
  transaction: Consumir,
): Promise<ServiceResponse<RecursoSequelizeModel>> {
  const responseService = await updateRecurso({
    id: transaction.id,
    saldo_disponivel: transaction.saldo_disponivel,
  });

  return responseService;
}

export default {
  getRecurso,
  updateRecurso,
  consumir,
};
