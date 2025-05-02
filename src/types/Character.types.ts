export interface Luchador {
  nombre: string;
  apodo: string;
  imagen: string;
  estilo: string;
  pais: string;
  historia: string;
  derrotas: number;
}

export interface Pelea {
  id: number;
  luchador1: Luchador;
  luchador2: Luchador;
  votos1: number;
  votos2: number;
  haVotado: boolean;
}
