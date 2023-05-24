import ClubeModel, { 
  ClubeInputtableFields,
} from '../database/models/clube.model';

async function create(transaction: ClubeInputtableFields) {
  const newClube = await ClubeModel.create(transaction);

  return newClube.dataValues;
}

export default {
  create,
};