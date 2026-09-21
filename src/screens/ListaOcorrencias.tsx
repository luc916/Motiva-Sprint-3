import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OcorrenciaCard from '../components/OcorrenciaCard';
import { useOcorrencias } from '../context/OcorrenciaContext';
import { RootStackParamList } from '../types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const ListaOcorrencias: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { ocorrencias, resolver, excluir, salvando } = useOcorrencias();
  const navigation = useNavigation<NavProp>();

  const pendentes = useMemo(
    () => ocorrencias.filter((o) => !o.resolvida),
    [ocorrencias],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Lista de Ocorrências</Text>
      </View>

      <FlatList
        data={pendentes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <OcorrenciaCard
            ocorrencia={item}
            disabled={salvando}
            onDetail={(id) => navigation.navigate('DetalheOcorrencia', { id })}
            onDelete={excluir}
            onResolve={resolver}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✅</Text>
            <Text style={styles.emptyText}>Nenhuma ocorrência pendente.</Text>
            <Text style={styles.emptyHint}>Toque em + para registrar uma nova.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NovaOcorrencia')}
        accessibilityRole="button"
        accessibilityLabel="Nova ocorrência"
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
    paddingBottom: 96,
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
  },
  fab: {
    position: 'absolute',
    bottom: 88,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A148C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 34,
    fontWeight: '300',
  },
});

export default ListaOcorrencias;
