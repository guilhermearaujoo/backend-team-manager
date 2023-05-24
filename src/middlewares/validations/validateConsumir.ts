import { InicialValuesConsumir } from '../../types/Consumir';
import mapMessages, { MessageType } from '../../utils/MapMessages';

export default function validateConsumir({
  clube_id: clubeID,
  recurso_id: recursoID,
  valor_consumo: valorConsumo,
}: InicialValuesConsumir): string | null {
  if (!clubeID) return mapMessages(MessageType.CLUBE_ID_REQUIRED);
  if (Number.isNaN(Number(clubeID))) { return mapMessages(MessageType.CLUBE_ID_NOT_NUMBER); }
  if (!recursoID) return mapMessages(MessageType.RECURSO_ID_REQUIRED);
  if (Number.isNaN(Number(recursoID))) { return mapMessages(MessageType.RECURSO_ID_NOT_NUMBER); }
  if (!valorConsumo && valorConsumo !== 0) { 
    return mapMessages(MessageType.VALOR_CONSUMO_REQUIRED); 
  }
  if (Number.isNaN(Number(valorConsumo))) return mapMessages(MessageType.VALOR_CONSUMO_NOT_NUMBER);
  if (valorConsumo < 0) return mapMessages(MessageType.VALOR_CONSUMO_LESS_THAN_ZERO);

  return null;
}
