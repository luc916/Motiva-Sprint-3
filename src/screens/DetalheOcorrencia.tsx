import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RISCO_CONFIG } from '../components/OcorrenciaCard';
import { useOcorrencias } from '../context/OcorrenciaContext';
import { DetalheOcorrenciaProps } from '../types';

export default function DetalheOcorrencia({ route }: DetalheOcorrenciaProps) {
  const { ocorrencias } = useOcorrencias();
  const ocorrencia = ocorrencias.find(item => item.id === route.params.id);
  if (!ocorrencia) return <Text>Ocorrência não encontrada. Volte para a lista.</Text>;
  const risco = RISCO_CONFIG[ocorrencia.risco];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{ocorrencia.titulo}</Text>
        <Text style={[styles.risco, { color: risco.color, backgroundColor: risco.bg }]}>Risco {risco.label}</Text>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.texto}>{ocorrencia.descricao}</Text>
        <Text style={styles.label}>Local</Text>
        <Text style={styles.texto}>{ocorrencia.local}</Text>
        <Text style={styles.label}>Data do registro</Text>
        <Text style={styles.texto}>{new Date(ocorrencia.data).toLocaleString('pt-BR')}</Text>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.texto}>{ocorrencia.resolvida ? 'Resolvida' : 'Pendente'}</Text>
        <Text style={styles.label}>Número do registro</Text>
        <Text style={styles.texto}>{ocorrencia.id}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E8EAF6' },
  conteudo: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 14 },
  titulo: { fontSize: 22, fontWeight: '700', color: '#4A148C', marginBottom: 16 },
  risco: { alignSelf: 'flex-start', padding: 8, borderRadius: 8, fontWeight: '700' },
  label: { fontSize: 14, fontWeight: '600', color: '#4A148C', marginTop: 20, marginBottom: 6 },
  texto: { fontSize: 16, lineHeight: 24, color: '#333333' },
});
