import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Clube } from '../../types/Clube';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<Clube>>('clubes', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      clube: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      saldo_disponivel: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    }) 
  },

  down(queryInterface: QueryInterface) { 
    return queryInterface.dropTable('clubes') 
  } 
};