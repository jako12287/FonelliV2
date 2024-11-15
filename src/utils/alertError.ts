import {Alert} from 'react-native';

export const CustomAlert = () => {
  return Alert.alert(
    'Error en el inicio de sesión',
    'Por favor, verifica tus credenciales o inténtalo nuevamente.',
    [
      {
        text: 'OK',
        onPress: () => console.log('Alerta cerrada'),
      },
    ],
    {cancelable: true},
  );
};


export const CustomAlertLogOut = (dispatch: any, logout: any, navigation: any) => {
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
