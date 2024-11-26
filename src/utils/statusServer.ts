import {getFetch} from '../api/serverStatus';

export const getVerifyStatusServer = async () => {
  try {
    return await getFetch();
  } catch (error) {
    console.error('Error al obtener estado del servidor', {error});
  }
};
