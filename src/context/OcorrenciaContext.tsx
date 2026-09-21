import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { carregarOcorrencias, salvarOcorrencias } from '../services/ocorrenciaStorage';
import { NovaOcorrenciaDados, Ocorrencia } from '../types';

type OcorrenciaContextData = {
  ocorrencias: Ocorrencia[];
  carregando: boolean;
  salvando: boolean;
  erro: string;
  carregar: () => Promise<void>;
  adicionar: (dados: NovaOcorrenciaDados) => Promise<void>;
  resolver: (id: number) => Promise<void>;
  excluir: (id: number) => Promise<void>;
};
const OcorrenciaContext = createContext<OcorrenciaContextData | undefined>(undefined);

export function OcorrenciaProvider({ children }: { children: React.ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const gravando = useRef(false);

  async function carregar() {
    setCarregando(true);
    setErro('');
    try {
      setOcorrencias(await carregarOcorrencias());
    } catch {
      setErro('Não foi possível carregar as ocorrências. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => { void carregar(); }, []);

  async function salvar(lista: Ocorrencia[]) {
    if (gravando.current || carregando || erro) {
      throw new Error('Aguarde o carregamento ou a gravação atual.');
    }
    gravando.current = true;
    setSalvando(true);
    try {
      // Só confirma a mudança na tela depois de salvar no aparelho.
      await salvarOcorrencias(lista);
      setOcorrencias(lista);
    } finally {
      gravando.current = false;
      setSalvando(false);
    }
  }

  async function adicionar(dados: NovaOcorrenciaDados) {
    if (!dados.titulo.trim() || !dados.descricao.trim() || !dados.local.trim()) {
      throw new Error('Preencha título, descrição e local.');
    }
    const maiorId = ocorrencias.reduce((maior, item) => Math.max(maior, item.id), 0);
    const nova: Ocorrencia = {
      ...dados,
      titulo: dados.titulo.trim(), descricao: dados.descricao.trim(), local: dados.local.trim(),
      id: Math.max(Date.now(), maiorId + 1),
      data: new Date().toISOString(),
      resolvida: false,
    };
    await salvar([nova, ...ocorrencias]);
  }
  async function resolver(id: number) {
    await salvar(ocorrencias.map(item => item.id === id ? { ...item, resolvida: true } : item));
  }
  async function excluir(id: number) {
    await salvar(ocorrencias.filter(item => item.id !== id));
  }
  return (
    <OcorrenciaContext.Provider value={{ ocorrencias, carregando, salvando, erro, carregar, adicionar, resolver, excluir }}>
      {children}
    </OcorrenciaContext.Provider>
  );
}
export function useOcorrencias(): OcorrenciaContextData {
  const context = useContext(OcorrenciaContext);
  if (!context) throw new Error('Use o contexto dentro de OcorrenciaProvider.');
  return context;
}
