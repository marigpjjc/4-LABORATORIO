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

    const totalVotos = pelea.votos1 + pelea.votos2;
    const porcentaje1 = totalVotos ? (pelea.votos1 / totalVotos) * 100 : 0;
    const porcentaje2 = totalVotos ? (pelea.votos2 / totalVotos) * 100 : 0;

    this.innerHTML = `
  <style>
    .card {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px;
      margin: 20px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 700px;
      flex-wrap: wrap;
    }
    .card div {
      text-align: center;
      margin: 1rem;
      flex: 1;
    }
    button {
      padding: 10px 20px;
      border: none;
      background-color: #007bff;
      color: white;
      font-size: 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    img {
      border-radius: 8px;
      margin: 1rem 0;
      max-width: 120px;
    }
    .bar-container {
      height: 15px;
      background-color: #e0e0e0;
      border-radius: 8px;
      margin: 10px 0;
      overflow: hidden;
    }
    .bar {
      height: 100%;
      background-color: #28a745;
      transition: width 0.3s ease;
    }
  </style>

  <div class="card">
    <div>
      <h3>${pelea.luchador1.nombre} (${pelea.luchador1.apodo})</h3>
      <img src="${pelea.luchador1.imagen}" alt="${pelea.luchador1.nombre}">
      <div class="bar-container">
        <div class="bar" style="width: ${porcentaje1}%"></div>
      </div>
      <p>${pelea.votos1} votos (${porcentaje1.toFixed(1)}%)</p>
      <button ${pelea.haVotado ? 'disabled' : ''} data-vote="1">Votar</button>
    </div>
    <div>
      <h3>${pelea.luchador2.nombre} (${pelea.luchador2.apodo})</h3>
      <img src="${pelea.luchador2.imagen}" alt="${pelea.luchador2.nombre}">
      <div class="bar-container">
        <div class="bar" style="width: ${porcentaje2}%"></div>
      </div>
      <p>${pelea.votos2} votos (${porcentaje2.toFixed(1)}%)</p>
      <button ${pelea.haVotado ? 'disabled' : ''} data-vote="2">Votar</button>
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
