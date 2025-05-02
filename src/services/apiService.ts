import { Luchador } from '../types/Character.types';

export async function fetchLuchadores(): Promise<Luchador[]> {
  const response = await fetch('/data/luchadores.json');
  if (!response.ok) throw new Error('Error al cargar los luchadores');
  return await response.json();
}

