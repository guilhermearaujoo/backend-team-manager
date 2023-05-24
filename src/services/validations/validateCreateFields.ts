import { ClubeInputtableFields } from '../../database/models/clube.model';

export default function validateParams({
  clube,
  saldoDisponivel,
}: ClubeInputtableFields): string | null {
  if (!clube) return 'clube is required';
  if (!saldoDisponivel) return 'saldoDisponivel is required';
  
  return null;
}