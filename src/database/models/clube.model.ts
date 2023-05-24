import { Model, ModelDefined, DataTypes, Optional } from 'sequelize';
import { Clube } from '../../types/Clube';
import db from './index';

export type ClubeInputtableFields = Optional<Clube, 'id'>;
export type ClubeSequelizeModel = Model<Clube, ClubeInputtableFields>;

type ClubeSequelizeModelCreator = ModelDefined<Clube, ClubeInputtableFields>;

const ClubeModel: ClubeSequelizeModelCreator = db.define('Clube', {
  clube: DataTypes.STRING,
  saldoDisponivel: DataTypes.DECIMAL(10, 2),
}, {
  tableName: 'clubes',
  timestamps: false,
  underscored: true,
});

export default ClubeModel;