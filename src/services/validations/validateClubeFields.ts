import { ClubeInputtableFields } from '../../database/models/clube.model';
import mapMessages, { MessageType } from '../../utils/MapMessages';

export default function validateParams({
  clube,
  saldo_disponivel: saldoDisponivel,
}: ClubeInputtableFields): string | null {
  if (!clube) return mapMessages(MessageType.CLUBE_REQUIRED);
  if (!saldoDisponivel && saldoDisponivel !== 0) return mapMessages(MessageType.SALDO_REQUIRED);
  if (Number.isNaN(Number(saldoDisponivel))) return mapMessages(MessageType.SALDO_NOT_NUMBER);
  if (saldoDisponivel < 0) return mapMessages(MessageType.SALDO_LESS_THAN_ZERO);
  
  return null;
}