import { Model, ModelDefined, DataTypes, Optional } from 'sequelize';
import { Recurso } from '../../types/Recurso';
import db from './index';

export type RecursoInputtableFields = Optional<Recurso, 'id'>;
export type UserSequelizeModel = Model<Recurso, RecursoInputtableFields>;

type RecursoSequelizeModelCreator = ModelDefined<Recurso, RecursoInputtableFields>;

const RecursoModel: RecursoSequelizeModelCreator = db.define('Recurso', {
  recurso: DataTypes.STRING,
  saldoDisponivel: DataTypes.DECIMAL(10, 2),
}, {
  tableName: 'recursos',
  timestamps: false,
  underscored: true,
});

export default RecursoModel;