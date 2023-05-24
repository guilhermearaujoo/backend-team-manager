import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('recursos', [
      {
        recurso: 'Recurso para passagens',
        saldo_disponivel: 10000.00
      },
      {
        recurso: 'Recurso para hospedagens',
        saldo_disponivel: 10000.00
      },
    ], {});
  },
  
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('recursos', {});
  }
};