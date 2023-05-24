import ClubeModel, {
  ClubeInputtableFields,
  ClubeSequelizeModel,
} from '../database/models/clube.model';

import { Clube, ClubeUpdated } from '../types/Clube';
import { Update } from '../types/Update';
import { ServiceResponse } from '../types/ServiceResponse';
import validateParams from './validations/validateClubeFields';
import validateUpdate from './validations/validateUpdateFields';

import mapMessages, { MessageType } from '../utils/MapMessages';
import { Consumir } from '../types/Consumir';

async function create(
  transaction: ClubeInputtableFields,
): Promise<ServiceResponse<Clube>> {
  let responseService: ServiceResponse<Clube>;

  const error = validateParams(transaction);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  try {
    const newClube = await ClubeModel.create(transaction);
    responseService = { status: 'SUCCESSFUL', data: newClube.dataValues };
  } catch (err: any) {
    responseService = {
      status: 'INVALID_DATA',
      data: { message: err.message },
    };
  }

  return responseService;
}

async function list(): Promise<ServiceResponse<ClubeSequelizeModel[]>> {
  let responseService: ServiceResponse<ClubeSequelizeModel[]>;

  try {
    const transactions = await ClubeModel.findAll();
    responseService = { status: 'SUCCESSFUL', data: transactions };
  } catch (err: any) {
    responseService = {
      status: 'INVALID_DATA',
      data: { message: err.message },
    };
  }

  return responseService;
}

async function getClube(
  id: number,
): Promise<ServiceResponse<ClubeSequelizeModel>> {
  let responseService: ServiceResponse<ClubeSequelizeModel>;

  if (!id) {
    responseService = {
      status: 'INVALID_DATA',
      data: { message: mapMessages(MessageType.CLUBE_REQUIRED) },
    };
    return responseService;
  }

  try {
    const recurso = await ClubeModel.findByPk(id);
    if (!recurso) {
      return {
        status: 'INVALID_DATA',
        data: { message: mapMessages(MessageType.CLUBE_NOT_FOUND) },
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

async function updateClube(
  transaction: Update,
): Promise<ServiceResponse<ClubeUpdated>> {
  let responseService: ServiceResponse<ClubeUpdated>;

  const error = validateUpdate(transaction);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const clube = await getClube(transaction.id);
  responseService = { ...clube } as ServiceResponse<ClubeUpdated>;

  if (clube.status === 'SUCCESSFUL') {
    await ClubeModel.update(
      { saldo_disponivel: transaction.saldo_disponivel },
      { where: { id: transaction.id } },
    );

    const updatedClube = await getClube(transaction.id);
    if (updatedClube.status === 'SUCCESSFUL') {
      responseService = {
        status: 'SUCCESSFUL',
        data: {
          id: transaction.id,
          saldo_anterior: clube.data.dataValues.saldo_disponivel,
          saldo_atual: updatedClube.data.dataValues.saldo_disponivel,
        },
      };
    }
  }

  return responseService;
}

async function consumir(
  transaction: Consumir,
): Promise<ServiceResponse<ClubeUpdated>> {
  const responseService = await updateClube({
    id: transaction.id,
    saldo_disponivel: transaction.saldo_disponivel,
  });

  return responseService;
}

export default {
  create,
  list,
  getClube,
  updateClube,
  consumir,
};
