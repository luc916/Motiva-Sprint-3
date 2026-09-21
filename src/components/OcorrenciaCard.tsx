import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ocorrencia, RiscoNivel } from '../types';

// ─── Risk config ──────────────────────────────────────────────────────────────

export const RISCO_CONFIG: Record<RiscoNivel, { label: string; color: string; bg: string; barColor: string }> = {
  baixo: { label: 'Baixo', color: '#1B5E20', bg: '#E8F5E9', barColor: '#43A047' },
  medio: { label: 'Médio', color: '#E65100', bg: '#FFF3E0', barColor: '#FB8C00' },
  alto:  { label: 'Alto',  color: '#B71C1C', bg: '#FFEBEE', barColor: '#E53935' },
};

interface OcorrenciaCardProps {
  ocorrencia: Ocorrencia;
  onDetail?: (id: number) => void;
  disabled?: boolean;
  onDelete?: (id: number) => Promise<void>;
  onResolve?: (id: number) => Promise<void>;
}

const OcorrenciaCard: React.FC<OcorrenciaCardProps> = ({ ocorrencia, onDelete, onResolve, onDetail, disabled }) => {
  const [erro, setErro] = useState('');
  async function executar(acao: (id: number) => Promise<void>) {
    setErro('');
    try { await acao(ocorrencia.id); }
    catch { setErro('Não foi possível salvar. Tente novamente.'); }
  }
  const risco = RISCO_CONFIG[ocorrencia.risco];

  return (
    <View style={styles.card}>
      {/* Colored left bar indicating risk level */}
      <View style={[styles.riskBar, { backgroundColor: risco.barColor }]} />

      <View style={styles.body}>
        {/* Top row: title + badge */}
        <View style={styles.topRow}>
          <Text style={styles.titulo} numberOfLines={1}>
            {ocorrencia.titulo}
          </Text>
          <View style={[styles.badge, { backgroundColor: risco.bg }]}>
            <Text style={[styles.badgeText, { color: risco.color }]}>
              ● {risco.label}
            </Text>
          </View>
        </View>

        {/* Details */}
        <Text style={styles.detalhes} numberOfLines={2}>
          {ocorrencia.descricao}
        </Text>

        <Text style={styles.detalhes}>{ocorrencia.local}</Text>
        <Text style={styles.detalhes}>{new Date(ocorrencia.data).toLocaleString('pt-BR')}</Text>
        {onDetail && (
          <TouchableOpacity accessibilityRole="button" onPress={() => onDetail(ocorrencia.id)} style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#4A148C', fontWeight: '600' }}>Ver detalhes</Text>
          </TouchableOpacity>
        )}
        {!!erro && <Text style={{ color: '#B71C1C' }}>{erro}</Text>}
        {(onDelete || onResolve) && (
          <View style={styles.actions}>
            {onDelete && (
              <TouchableOpacity
                style={styles.iconBtn}
                disabled={disabled}
                accessibilityRole="button"
                onPress={() => void executar(onDelete)}
                accessibilityLabel="Excluir ocorrência"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.iconDelete}>🗑</Text>
              </TouchableOpacity>
            )}
            {onResolve && !ocorrencia.resolvida && (
              <TouchableOpacity
                style={[styles.iconBtn, styles.iconBtnResolve]}
                disabled={disabled}
                accessibilityRole="button"
                onPress={() => void executar(onResolve)}
                accessibilityLabel="Marcar como resolvida"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.iconCheck}>✓</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  riskBar: {
    width: 5,
  },
  body: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 14,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  titulo: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#4A148C',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  detalhes: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 17,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E5F5',
  },
  iconBtnResolve: {
    backgroundColor: '#EDE7F6',
  },
  iconDelete: {
    fontSize: 15,
  },
  iconCheck: {
    fontSize: 16,
    color: '#4A148C',
    fontWeight: '700',
  },
});

export default OcorrenciaCard;
