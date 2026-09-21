import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useOcorrencias } from '../context/OcorrenciaContext';
import { NovaOcorrenciaProps, RiscoNivel } from '../types';

// ─── Risco options ─────────────────────────────────────────────────────────────

const RISCO_OPTIONS: { value: RiscoNivel; label: string; desc: string; color: string; bg: string }[] = [
  { value: 'baixo', label: 'Baixo', desc: 'Situação controlada, sem risco imediato',   color: '#1B5E20', bg: '#E8F5E9' },
  { value: 'medio', label: 'Médio', desc: 'Requer atenção e monitoramento',             color: '#E65100', bg: '#FFF3E0' },
  { value: 'alto',  label: 'Alto',  desc: 'Perigo imediato, intervenção urgente',       color: '#B71C1C', bg: '#FFEBEE' },
];

const NovaOcorrencia: React.FC<NovaOcorrenciaProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { adicionar, salvando } = useOcorrencias();
  const [titulo, setTitulo]           = useState<string>('');
  const [local, setLocal] = useState('');
  const [erro, setErro] = useState('');
  const [detalhes, setDetalhes]       = useState<string>('');
  const [risco, setRisco]             = useState<RiscoNivel>('baixo');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [tituloError, setTituloError] = useState<boolean>(false);

  const selected = RISCO_OPTIONS.find((o) => o.value === risco)!;

  const handleSalvar = async () => {
    setErro('');
    if (!titulo.trim() || !detalhes.trim() || !local.trim()) {
      setTituloError(!titulo.trim());
      setErro('Preencha o título, a descrição e o local.');
      return;
    }
    try {
      await adicionar({ titulo, descricao: detalhes, local, risco });
      navigation.popTo('MainTabs', { screen: 'Todas' });
    } catch {
      setErro('Não foi possível salvar a ocorrência. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          disabled={salvando}
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Voltar"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Ocorrência</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Título ── */}
        <View style={[styles.inputWrapper, tituloError && styles.inputWrapperError]}>
          <TextInput
            style={styles.input}
            accessibilityLabel="Título"
            editable={!salvando}
            placeholder="Título da ocorrência"
            placeholderTextColor="#AAAAAA"
            value={titulo}
            onChangeText={(text) => {
              setTitulo(text);
              if (tituloError) setTituloError(false);
            }}
            returnKeyType="next"
            maxLength={80}
          />
        </View>
        {tituloError && (
          <Text style={styles.errorText}>O título é obrigatório.</Text>
        )}

        {/* ── Detalhes ── */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            accessibilityLabel="Descrição"
            editable={!salvando}
            placeholder="Descrição do que aconteceu"
            placeholderTextColor="#AAAAAA"
            value={detalhes}
            onChangeText={setDetalhes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={300}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} accessibilityLabel="Local" placeholder="Local (rodovia, km e sentido)"
            placeholderTextColor="#AAAAAA" value={local} onChangeText={setLocal} maxLength={120} editable={!salvando} />
        </View>
        <Text style={{ color: '#666666' }}>A data e a hora são registradas ao salvar.</Text>
        {/* Classificação de risco */}
        <View>
          <Text style={styles.fieldLabel}>Classificação de Risco</Text>

          {/* Trigger */}
          <TouchableOpacity
            style={[
              styles.dropdownTrigger,
              { borderBottomColor: selected.color },
            ]}
            disabled={salvando}
            accessibilityRole="button"
            accessibilityLabel="Selecionar risco"
            onPress={() => setDropdownOpen((v) => !v)}
            activeOpacity={0.8}
          >
            <View style={[styles.dot, { backgroundColor: selected.color }]} />
            <Text style={[styles.triggerText, { color: selected.color }]}>
              {selected.label}
            </Text>
            <Text style={styles.arrow}>{dropdownOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Menu */}
          {dropdownOpen && (
            <View style={styles.menu}>
              {RISCO_OPTIONS.map((opt, i) => {
                const isSelected = risco === opt.value;
                return (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={opt.label}
                    key={opt.value}
                    style={[
                      styles.menuItem,
                      i < RISCO_OPTIONS.length - 1 && styles.menuItemBorder,
                      isSelected && { backgroundColor: opt.bg },
                    ]}
                    onPress={() => {
                      setRisco(opt.value);
                      setDropdownOpen(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.dot, { backgroundColor: opt.color }]} />
                    <View style={styles.menuTextBlock}>
                      <Text style={[styles.menuItemLabel, { color: opt.color }]}>
                        {opt.label}
                      </Text>
                      <Text style={styles.menuItemDesc}>{opt.desc}</Text>
                    </View>
                    {isSelected && (
                      <Text style={[styles.checkmark, { color: opt.color }]}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {!!erro && <Text accessibilityRole="alert" style={styles.errorText}>{erro}</Text>}
        <TouchableOpacity
          style={[styles.btn, !titulo.trim() && styles.btnDisabled]}
          disabled={salvando}
          accessibilityRole="button"
          onPress={handleSalvar}
          activeOpacity={0.85}
          accessibilityLabel="Adicionar ocorrência"
        >
          <Text style={styles.btnText}>{salvando ? 'SALVANDO...' : 'ADICIONAR'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#E8EAF6' },

  // Header
  header: {
    backgroundColor: '#4A148C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 16,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  backIcon: { fontSize: 20, color: '#FFFFFF', fontWeight: '600', lineHeight: 24 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.3 },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { padding: 20, gap: 14 },

  // Inputs
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#D1C4E9',
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperError: { borderBottomColor: '#B71C1C' },
  input: { paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#333333' },
  inputMultiline: { minHeight: 100 },
  errorText: { fontSize: 12, color: '#B71C1C', marginTop: -8, paddingHorizontal: 4 },

  // Field label
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A148C',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
    paddingHorizontal: 2,
  },

  // Dropdown trigger
  dropdownTrigger: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderBottomWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  triggerText: { flex: 1, fontSize: 15, fontWeight: '600' },
  arrow: { fontSize: 10, color: '#999999' },

  // Dropdown menu
  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 4,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F3E5F5' },
  menuTextBlock: { flex: 1 },
  menuItemLabel: { fontSize: 14, fontWeight: '700' },
  menuItemDesc: { fontSize: 11, color: '#888888', marginTop: 1 },
  checkmark: { fontSize: 15, fontWeight: '700', marginLeft: 8 },

  // Button
  btn: {
    backgroundColor: '#4A148C',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#4A148C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: '#9575CD', shadowOpacity: 0.1, elevation: 2 },
  btnText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1.2 },
});

export default NovaOcorrencia;
