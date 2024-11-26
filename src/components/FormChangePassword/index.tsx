import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomInput from '../InputNative';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import CustomBotton from '../CustomBotton';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import {CustomAlert, CustomAlertGlobal} from '../../utils/alertError';
import {changePassword} from '../../api';
import Loader from '../Loader';

interface PropsForm {
  _id: string;
}
const Schema = yup.object().shape({
  password: yup
    .string()
    .required('Ingresa la contraseña')
    .min(7, 'Al menos 7 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirma tu contraseña')
    .oneOf([yup.ref('password')], 'Contraseñas no coinciden'),
});

const FormChange: FC<PropsForm> = ({_id}) => {
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
      _id,
      newPassword: data.password,
    };
    try {
      const result = await changePassword(dataSend);
      console.log('desde la vista datos form change', result);
      if (result?.message === 'Contraseña actualizada correctamente.') {
        reset();
        navigation.navigate('Menu');
      } else {
        CustomAlertGlobal(
          result?.message || 'Error desconocido. Intenta nuevamente.',
        );
      }
      return;
    } catch (error) {
      CustomAlert();
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
          label="Contraseña"
          name="password"
          placeholder=""
          errors={errors}
          defaultValue={''}
          secureTextEntry
        />
        <CustomInput
          control={control}
          label="Contraseña"
          name="confirmPassword"
          placeholder=""
          errors={errors}
          defaultValue={''}
          secureTextEntry
        />
      </View>
      {isLoading ? (
        <Loader />
      ) : (
        <CustomBotton title="Enviar" onClick={handleSubmit(onsubmit)} />
      )}
    </View>
  );
};

export default FormChange;
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
