import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OcorrenciaCard from '../components/OcorrenciaCard';
import { useOcorrencias } from '../context/OcorrenciaContext';

const Resolvidas: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { ocorrencias, excluir, salvando } = useOcorrencias();

  const resolvidas = useMemo(
    () => ocorrencias.filter((o) => o.resolvida),
    [ocorrencias],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Resolvidas</Text>
      </View>

      <FlatList
        data={resolvidas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <OcorrenciaCard
            ocorrencia={item}
            disabled={salvando}
            onDetail={(id) => navigation.navigate('DetalheOcorrencia', { id })}
            onDelete={excluir}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>Nenhuma ocorrência resolvida ainda.</Text>
            <Text style={styles.emptyHint}>Marque ocorrências como resolvidas na aba Pendentes.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
  header: {
    backgroundColor: '#4A148C',
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  list: {
    padding: 16,
    paddingBottom: 32,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
    gap: 6,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A148C',
  },
  emptyHint: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default Resolvidas;
