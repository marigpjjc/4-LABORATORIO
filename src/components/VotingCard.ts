import { AppActions } from '../flux/AppActions';
import AppStore from '../flux/AppStore';
import { Pelea } from '../types/Character.types';

class VotingCard extends HTMLElement {
  private peleaId: number = 0;

  connectedCallback() {
    this.peleaId = parseInt(this.getAttribute('pelea-id') || '0');
    this.render();
    AppStore.subscribe(() => this.render());
  }

  render() {
    const pelea = AppStore.getPeleas().find(p => p.id === this.peleaId);
    if (!pelea) return;

    this.innerHTML = `
      <div class="card">
        <div>
          <h3>${pelea.luchador1.nombre} (${pelea.luchador1.apodo})</h3>
          <img src="${pelea.luchador1.imagen}" alt="${pelea.luchador1.nombre}" width="100">
          <button ${pelea.haVotado ? 'disabled' : ''} data-vote="1">Votar</button>
        </div>
        <div>
          <h3>${pelea.luchador2.nombre} (${pelea.luchador2.apodo})</h3>
          <img src="${pelea.luchador2.imagen}" alt="${pelea.luchador2.nombre}" width="100">
          <button ${pelea.haVotado ? 'disabled' : ''} data-vote="2">Votar</button>
        </div>
        <div>
          <strong>Votos:</strong> ${pelea.votos1} - ${pelea.votos2}
        </div>
      </div>
    `;

    this.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const vote = parseInt((btn as HTMLButtonElement).dataset.vote || '0') as 1 | 2;
        AppActions.vote(this.peleaId, vote);
      });
    });
  }
}

customElements.define('voting-card', VotingCard);
