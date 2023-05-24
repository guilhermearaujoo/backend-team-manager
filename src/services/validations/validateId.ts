import mapMessages, { MessageType } from '../../utils/MapMessages';

export default function validateParams(
  id: number,
): string | null {
  if (!id) return mapMessages(MessageType.ID_REQUIRED);
  if (Number.isNaN(Number(id))) return mapMessages(MessageType.ID_NOT_NUMBER);
  
  return null;
}