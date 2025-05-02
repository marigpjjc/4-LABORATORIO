import dispatcher from './AppDispatcher';
import { Luchador, Pelea } from '../types/Character.types';

type Listener = () => void;

class AppStore {
  private peleas: Pelea[] = [];
  private listeners: Listener[] = [];

  constructor() {
    dispatcher.register(this.handleActions.bind(this));
  }

  private handleActions(action: { type: string; payload?: any }) {
    switch (action.type) {
      case 'LOAD_LUCHADORES':
        this.createPeleas(action.payload);
        break;
      case 'VOTE':
        this.registerVote(action.payload);
        break;
    }
    this.emitChange();
  }

  private createPeleas(luchadores: Luchador[]) {
    this.peleas = [];
    for (let i = 0; i < luchadores.length; i += 2) {
      this.peleas.push({
        id: i / 2,
        luchador1: luchadores[i],
        luchador2: luchadores[i + 1],
        votos1: 0,
        votos2: 0,
        haVotado: false,
      });
    }
  }

  private registerVote({ fightId, luchador }: { fightId: number; luchador: 1 | 2 }) {
    const pelea = this.peleas.find(p => p.id === fightId);
    if (pelea && !pelea.haVotado) {
      if (luchador === 1) pelea.votos1++;
      else pelea.votos2++;
      pelea.haVotado = true;
    }
  }

  getPeleas() {
    return this.peleas;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  private emitChange() {
    this.listeners.forEach(listener => listener());
  }
}

export default new AppStore();
