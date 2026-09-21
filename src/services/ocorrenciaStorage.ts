import AsyncStorage from '@react-native-async-storage/async-storage';
import { ocorrenciasMock } from '../data/ocorrenciasMock';
import { Ocorrencia } from '../types';

const CHAVE = '@motiva:ocorrencias';

export async function salvarOcorrencias(ocorrencias: Ocorrencia[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(ocorrencias));
}

export async function carregarOcorrencias(): Promise<Ocorrencia[]> {
  const salvo = await AsyncStorage.getItem(CHAVE);
  // Uma lista vazia também é válida. O mock só entra se a chave não existir.
  if (salvo === null) {
    await salvarOcorrencias(ocorrenciasMock);
    return ocorrenciasMock;
  }
  const dados: unknown = JSON.parse(salvo);
  if (!Array.isArray(dados) || !dados.every(ocorrenciaValida)) {
    throw new Error('Os dados salvos não estão no formato esperado.');
  }
  return dados;
}

function ocorrenciaValida(valor: unknown): valor is Ocorrencia {
  if (typeof valor !== 'object' || valor === null) return false;
  const item = valor as Partial<Ocorrencia>;
  return typeof item.id === 'number' && Number.isSafeInteger(item.id)
    && typeof item.titulo === 'string'
    && typeof item.descricao === 'string'
    && typeof item.local === 'string'
    && ['baixo', 'medio', 'alto'].includes(item.risco ?? '')
    && typeof item.data === 'string' && !Number.isNaN(Date.parse(item.data))
    && typeof item.resolvida === 'boolean';
}
