import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: 'baixo' | 'medio' | 'alto';
  data: string;
  titulo: string;
  resolvida: boolean;
};

export type RiscoNivel = Ocorrencia['risco'];
export type NovaOcorrenciaDados = Pick<Ocorrencia, 'titulo' | 'descricao' | 'local' | 'risco'>;
export type BottomTabParamList = { Todas: undefined; Resolvidas: undefined };
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  NovaOcorrencia: undefined;
  DetalheOcorrencia: { id: number };
};
export type NovaOcorrenciaProps = NativeStackScreenProps<RootStackParamList, 'NovaOcorrencia'>;
export type DetalheOcorrenciaProps = NativeStackScreenProps<RootStackParamList, 'DetalheOcorrencia'>;
