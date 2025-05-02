export interface Luchador {
  id: number;
  nombre: string;
  apodo: string;
  pais: string;
  estilo: string;
  victorias: number;
  derrotas: number;
  imagen: string;
}

export interface Pelea {
  id: number;
  luchador1: Luchador;
  luchador2: Luchador;
  votos1: number;
  votos2: number;
  haVotado: boolean;
}
