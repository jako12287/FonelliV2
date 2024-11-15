import {ParamListBase} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export interface RootTabsProps {
  [key: string]: undefined;
  Inicio: undefined;
}

export interface RootStackProps extends ParamListBase {
  Splahs: undefined
  Courtesy: undefined;
  Login: undefined;
  Menu: undefined;
  NewOrder: undefined;
  OrderHistory: undefined;
  Catalog: undefined;
  Success: undefined;

  // NewOrder: {
  //   orderId?: string;
  // };
}

export interface IconImageProps {
  size: number;
  source: ImageSourcePropType;
}

export enum Type {
  DEFAULT = 'default',
  EMAIL = 'email-address',
  NUMBER = 'number-pad',
}

export enum StatusProps {
  CAUTGHT = 'CAUTGHT',
  REQUIRED = 'REQUIRED',
  DELETE = 'DELETE',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
  DOWNLOAD = 'DOWNLOAD',
}
