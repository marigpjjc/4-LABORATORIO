import dispatcher from './AppDispatcher';
import { Luchador } from '../types/Character.types';
import { fetchLuchadores } from '../services/apiService';

export const AppActions = {
  async loadLuchadores() {
    const luchadores = await fetchLuchadores();
    dispatcher.dispatch({ type: 'LOAD_LUCHADORES', payload: luchadores });
  },

  vote(fightId: number, luchador: 1 | 2) {
    dispatcher.dispatch({ type: 'VOTE', payload: { fightId, luchador } });
  },
};
