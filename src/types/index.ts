import {ParamListBase} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

export interface RootTabsProps {
  [key: string]: undefined;
  Inicio: undefined;
}

export interface RootStackProps extends ParamListBase {
  Splahs: undefined;
  Courtesy: undefined;
  Login: undefined;
  Menu: undefined;
  ChangePassword: {_id: string};
  OrderHistory: undefined;
  Catalog: undefined;
  Success: undefined;
  // NewOrder: undefined;
  NewOrder:
    | {
        orderId?: string;
      }
    | undefined;
  DetailOrder: {
    orderId?: string;
  };
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

export enum RoutesApi {
  LOGIN = '/login',
  STATUS = '/testbd',
  CHANGE_PASSWORD = '/changePassword',
  CREATE_ORDER = '/create_order',
  GET_ORDER_BY_ID = '/orders/user',
  GET_ORDER_BY_ID_NO_USER = '/orders',
  EDIT_ORDER = '/orders',
  DELETE_ORDER = '/orders',
}

export enum userType {
  CUSTOMER = 'CUSTOMER',
  COLLABORATOR = 'COLLABORATOR',
  ADMIN = 'ADMIN',
}

export enum stateType {
  PENDING = 'PENDING',
  CAUGHT = 'CAUGHT',
}
