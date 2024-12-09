import {Alert} from 'react-native';

type PropsAlert = {
  message1?: string;
  message2?: string;
};

export const CustomAlert = ({
  message1 = 'Error en el inicio de sesión',
  message2 = 'Por favor, verifica tus credenciales o inténtalo nuevamente.',
}: PropsAlert) => {
  return Alert.alert(
    message1,
    message2,
    [
      {
        text: 'OK',
      },
    ],
    {cancelable: true},
  );
};

export const CustomAlertGlobal = (message: string) => {
  return Alert.alert(
    'Alerta',
    message,
    [
      {
        text: 'OK',
      },
    ],
    {cancelable: true},
  );
};

export const CustomAlertLogOut = (
  dispatch: any,
  logout: any,
  navigation: any,
) => {
  return Alert.alert(
    'Cerrar sesión',
    '¿Estás seguro de que deseas cerrar sesión?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Cerrar sesión',
        onPress: async () => {
          try {
            await dispatch(logout() as never);
            // Redirige al usuario a la pantalla de login
            navigation.navigate('Courtesy');
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
        },
        style: 'destructive',
      },
    ],
    {cancelable: false},
  );
};
