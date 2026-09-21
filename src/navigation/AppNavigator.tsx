import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native';
import ListaOcorrencias from '../screens/ListaOcorrencias';
import NovaOcorrencia from '../screens/NovaOcorrencia';
import DetalheOcorrencia from '../screens/DetalheOcorrencia';
import Resolvidas from '../screens/Resolvidas';
import { BottomTabParamList, RootStackParamList } from '../types';

// ─── Bottom Tabs ──────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabs: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopColor: '#E8EAF6',
        borderTopWidth: 1,
        height: 64 + insets.bottom,
        paddingBottom: Math.max(insets.bottom, 10),
        paddingTop: 6,
      },
      tabBarActiveTintColor: '#4A148C',
      tabBarInactiveTintColor: '#AAAAAA',
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
      },
    }}
  >
    <Tab.Screen
      name="Todas"
      component={ListaOcorrencias}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>☰</Text>
        ),
        title: 'Pendentes',
        tabBarLabel: 'Pendentes',
      }}
    />
    <Tab.Screen
      name="Resolvidas"
      component={Resolvidas}
      options={{
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>✓</Text>
        ),
        tabBarLabel: 'Resolvidas',
      }}
    />
  </Tab.Navigator>
  );
};

// ─── Root Stack ───────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ title: 'Motiva App' }} />
    <Stack.Screen name="DetalheOcorrencia" component={DetalheOcorrencia} options={{ headerShown: true, title: 'Detalhe da ocorrência', headerStyle: { backgroundColor: '#4A148C' }, headerTintColor: '#FFFFFF' }} />
    <Stack.Screen
      name="NovaOcorrencia"
      component={NovaOcorrencia}
      options={{
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
