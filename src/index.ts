import { AppActions } from './flux/AppActions';
import AppStore from './flux/AppStore';
import './components/VotingCard';

document.addEventListener('DOMContentLoaded', () => {
  AppActions.loadLuchadores();
  const app = document.getElementById('app');

  AppStore.subscribe(() => {
    const peleas = AppStore.getPeleas();
    app!.innerHTML = peleas
      .map(p => `<voting-card pelea-id="${p.id}"></voting-card>`)
      .join('');
  });
});
