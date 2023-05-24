import { Options } from 'sequelize';
import 'dotenv/config';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: 'password',
  database: process.env.DB_NAME || 'cbc_api',
  host: process.env.DB_HOSTNAME || 'db',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
};

export = config;