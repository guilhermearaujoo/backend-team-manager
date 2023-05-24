import ClubeModel, { 
  ClubeInputtableFields,
  ClubeSequelizeModel,
} from '../database/models/clube.model';

import { Clube } from '../types/Clube';
import { ServiceResponse } from '../types/ServiceResponse';
import validateParams from './validations/validateCreateFields';

async function create(transaction: ClubeInputtableFields): Promise<ServiceResponse<Clube>> {
  let responseService: ServiceResponse<Clube>;
  responseService = { status: 'SERVER_ERROR', data: { message: 'Server found a problem' } };

  const error = validateParams(transaction);
  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  try {
    const newClube = await ClubeModel.create(transaction);
    responseService = { status: 'SUCCESSFUL', data: newClube.dataValues };
  } catch (err: unknown) {
    if (err instanceof Error) {
      responseService = { status: 'INVALID_DATA', data: { message: err.message } };
    }
  }
  
  return responseService;
}

async function list(): Promise<ServiceResponse<ClubeSequelizeModel[]>> {
  let responseService: ServiceResponse<ClubeSequelizeModel[]>;
  responseService = { status: 'SERVER_ERROR', data: { message: 'Server found a problem' } };
  
  try {
    const transactions = await ClubeModel.findAll();
    responseService = { status: 'SUCCESSFUL', data: transactions };
  } catch (err: unknown) {
    if (err instanceof Error) {
      responseService = { status: 'INVALID_DATA', data: { message: err.message } };
    }
  }

  return responseService;
}

export default {
  create,
  list,
};