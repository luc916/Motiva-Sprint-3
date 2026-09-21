import { Ocorrencia } from '../types';

// Exemplos usados somente na primeira abertura do app.
export const ocorrenciasMock: Ocorrencia[] = [
    {
      id: 1,
      titulo: 'Acidente com colisão traseira',
      descricao: 'Dois veículos envolvidos no km 142, pista parcialmente bloqueada. Equipe de resgate acionada.',
      risco: 'alto',
      local: 'Rodovia, km 142',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: false,
    },
    {
      id: 2,
      titulo: 'Mato invadindo a pista',
      descricao: 'Vegetação alta avançando sobre o acostamento e faixa direita no km 87. Risco de visibilidade reduzida.',
      risco: 'medio',
      local: 'Rodovia, km 87',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: false,
    },
    {
      id: 3,
      titulo: 'Animal na pista',
      descricao: 'Gado solto na rodovia no km 203, sentido sul. Motoristas sendo alertados pelo painel eletrônico.',
      risco: 'alto',
      local: 'Rodovia, km 203',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: false,
    },
    {
      id: 4,
      titulo: 'Buraco na pista',
      descricao: 'Cratera de aproximadamente 40 cm no km 310, faixa da esquerda. Risco de dano a veículos.',
      risco: 'medio',
      local: 'Rodovia, km 310',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: false,
    },
    {
      id: 5,
      titulo: 'Derramamento de carga',
      descricao: 'Caminhão perdeu parte da carga (areia) no km 56. Pista com material escorregadio.',
      risco: 'baixo',
      local: 'Rodovia, km 56',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: true,
    },
    {
      id: 6,
      titulo: 'Placa de sinalização caída',
      descricao: 'Placa de limite de velocidade derrubada pelo vento no km 178. Substituição necessária.',
      risco: 'baixo',
      local: 'Rodovia, km 178',
      data: '2026-09-21T12:00:00.000Z',
      resolvida: true,
    },
];
