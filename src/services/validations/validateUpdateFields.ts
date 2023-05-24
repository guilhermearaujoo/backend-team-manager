import { Update } from '../../types/Update';
import mapMessages, { MessageType } from '../../utils/MapMessages';

export default function validateParams({
  id,
  saldo_disponivel: saldoDisponivel,
}: Update): string | null {
  if (Number.isNaN(Number(id))) return mapMessages(MessageType.ID_NOT_NUMBER);
  if (Number.isNaN(Number(saldoDisponivel))) { return mapMessages(MessageType.SALDO_NOT_NUMBER); }
  if (!id) return mapMessages(MessageType.ID_REQUIRED);
  if (Number.isNaN(Number(id))) return mapMessages(MessageType.ID_NOT_NUMBER);
  if (!saldoDisponivel && saldoDisponivel !== 0) { return mapMessages(MessageType.SALDO_REQUIRED); }
  if (saldoDisponivel < 0) return mapMessages(MessageType.SALDO_LESS_THAN_ZERO);

  return null;
}
