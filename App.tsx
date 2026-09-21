import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OcorrenciaProvider, useOcorrencias } from './src/context/OcorrenciaContext';
import AppNavigator from './src/navigation/AppNavigator';

function Conteudo() {
  const { carregando, erro, carregar } = useOcorrencias();
  if (carregando || erro) {
    return (
      <View style={{ flex: 1, backgroundColor: '#E8EAF6', justifyContent: 'center', padding: 24, gap: 16 }}>
        {carregando ? <ActivityIndicator size="large" color="#4A148C" /> : <>
          <Text>{erro}</Text>
          <Button title="Tentar novamente" color="#4A148C" onPress={() => void carregar()} />
        </>}
      </View>
    );
  }
  return <AppNavigator />;
}
export default function App() {
  return (
    <SafeAreaProvider>
      <OcorrenciaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Conteudo />
        </NavigationContainer>
      </OcorrenciaProvider>
    </SafeAreaProvider>
  );
}
