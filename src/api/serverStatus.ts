import {RoutesApi} from '../types';

export const getFetch = async () => {
  try {
    const response = await fetch(
      `https://fonelllibackenfirebase.onrender.com${RoutesApi.STATUS}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Error al realizar la petición');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
