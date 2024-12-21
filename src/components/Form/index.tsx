import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from '../InputNative';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomBotton from '../CustomBotton';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slices/authReducer';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import {CustomAlert, CustomAlertGlobal} from '../../utils/alertError';
import {loginApi} from '../../api';
import Loader from '../Loader';
import {userType} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Schema = yup.object().shape({
  email: yup.string().required('Ingresa el usuario').email('Correo  inválido'),
  password: yup.string().required('Ingresa la contraseña'),
});

const Form = () => {
  const dispatch = useDispatch();
  const navigation = useCustomNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({mode: 'onChange', resolver: yupResolver(Schema)});

  const onsubmit = async (data: any) => {
    setIsLoading(true);
    const dataSend = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    try {
      const result = await loginApi(dataSend);
      if (
        result.message === 'Revisa las credenciales.' ||
        result.message === 'Contraseña incorrecta.'
      ) {
        CustomAlertGlobal('Revisa las credenciales');
        return;
      }

      if (result?.user) {
        await AsyncStorage.setItem('@USER', JSON.stringify(result.user));
      }
      if (result?.user?.type !== userType.CUSTOMER) {
        CustomAlertGlobal(
          'Tu cuenta no tiene acceso al aplicativo. Si crees que esto es un error, por favor contacta a soporte',
        );
        return;
      }

      if (result?.token) {
        dispatch(login(result) as never);
        if (!result?.user?.verify && result?.user?._id && result?.user?.changePass === 0) {
          reset();
          navigation.navigate('ChangePassword', {_id: result?.user?._id});
          return;
        }
        navigation.navigate('Menu');
      }
    } catch (error) {
      CustomAlert({
        message1: 'Error en el inicio de sesión',
        message2:
          'Por favor, verifica tus credenciales o inténtalo nuevamente.',
      });
      console.error('Error on login:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <CustomInput
          control={control}
          label="Cliente"
          name="email"
          placeholder=""
          errors={errors}
          defaultValue={''}
        />
        <CustomInput
          control={control}
          label="Contraseña"
          name="password"
          placeholder=""
          errors={errors}
          defaultValue={''}
          secureTextEntry
        />
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomBotton title="Ingresar" onClick={handleSubmit(onsubmit)} />
      )}
      <View style={styles.containerTextDown}>
        <Text style={styles.textDown}>
          *Solicita con atención al cliente tus accesos o cambios de contraseña.
        </Text>
      </View>
    </View>
  );
};

export default Form;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Responsive(40),
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Responsive(10),
  },
  textDown: {
    fontSize: Responsive(18),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    lineHeight: Responsive(40),
    textAlign: 'center',
  },
  containerTextDown: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive(40),
  },
});
