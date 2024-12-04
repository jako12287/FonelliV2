// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {RoutesApi} from '../types';

const BASE_URI = 'https://fonelllibackenfirebase.onrender.com';

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
