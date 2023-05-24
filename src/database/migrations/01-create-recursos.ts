import { Model, QueryInterface, DataTypes } from 'sequelize'; 

import { Recurso } from '../../types/Recurso';

export default { 
  up(queryInterface: QueryInterface) { 
    return queryInterface.createTable<Model<Recurso>>('recursos', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      recurso: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      saldoDisponivel: {
        field: 'saldo_disponivel',
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
    }) 
  }, 
  
  down(queryInterface: QueryInterface) { 
    return queryInterface.dropTable('recursos') 
  } 
};