export type Clube = {
  id: number,
  clube: string,
  saldo_disponivel: number,
};

export type ClubeUpdated = {
  id: number,
  saldo_anterior: number,
  saldo_atual: number,
};