// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RoutesApi} from '../types';

const BASE_URI = 'https://fonelllibackenfirebase.onrender.com';
// const BASE_URI = 'http://localhost:3000';

type PropsCredential = {
  email: string;
  password: string;
};

type PropsChangePass = {
  _id: string;
  newPassword: string;
};
export const loginApi = async ({email, password}: PropsCredential) => {
  try {
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.LOGIN}`,
      {email, password},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.log(
      'Error al realizar login:',
      error.response?.data || error.message,
    );
    return error.response?.data;
  }
};

export const changePassword = async ({_id, newPassword}: PropsChangePass) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.CHANGE_PASSWORD}`,
      {_id, newPassword},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error al cambiar contraseña:',
      error.response?.data || error.message,
    );
  }
};

interface OrderData {
  userId: string;
  model: string;
  caratage: string;
  color: string;
  rock: string;
  observations?: string;
  size?: any | null;
  long?: any | null;
  initialName?: any | null;
  name?: any | null;
  totalPieces?: number | null;
}

export const createOrder = async (data: OrderData) => {
  try {
    const response = await axios.post(
      `${BASE_URI}${RoutesApi.CREATE_ORDER}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error al crear la orden:',
      error.response?.data || error.message,
    );
    // Lanza el error para que pueda ser manejado por el llamador de la función
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_ORDER_BY_ID}/${userId}`,
    );
    return response.data.orders; // Devolver las órdenes
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw new Error('No se pudieron obtener las órdenes');
  }
};

export const setOrderById = async (orderId: string) => {
  console.log(
    'ruta de ordenes by id',
    `${BASE_URI}${RoutesApi.GET_ORDER_BY_ID_NO_USER}/${orderId}`,
  );
  try {
    const response = await axios.get(
      `${BASE_URI}${RoutesApi.GET_ORDER_BY_ID_NO_USER}/${orderId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw new Error('No se pudieron obtener las órdenes');
  }
};

export const editOrder = async (
  orderId: string,
  updatedData: Partial<OrderData>,
) => {
  try {
    const response = await axios.put(
      `${BASE_URI}${RoutesApi.EDIT_ORDER}/${orderId}`, // La ruta para editar la orden
      updatedData, // Los datos actualizados de la orden
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Devolver los datos actualizados
  } catch (error: any) {
    console.error(
      'Error al editar la orden:',
      error.response?.data || error.message,
    );
    throw new Error('No se pudo editar la orden');
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URI}${RoutesApi.DELETE_ORDER}/${orderId}`,
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || 'Error desconocido';

    console.error('Error al eliminar la orden:', errorMessage);

    throw new Error(errorMessage);
  }
};
