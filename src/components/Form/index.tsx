import React from 'react';
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
import {CustomAlert} from '../../utils/alertError';

const Schema = yup.object().shape({
  user: yup.string().required('Ingresa el usuario'),
  password: yup.string().required('Ingresa la contraseña'),
});

const Form = () => {
  const dispatch = useDispatch();
  const navigation = useCustomNavigation();

  const {
    control,
    handleSubmit,
    reset,
    // setValue,
    formState: {errors},
  } = useForm({mode: 'onChange', resolver: yupResolver(Schema)});

  const onsubmit = (data: any) => {
    try {
      console.log(data);
      const result: any = {
        data: {
          loginWithPin: {
            accessToken: 'mock-token',
            name: 'Jane Doe',
            email: 'janedoe@example.com',
          },
        },
      };
      dispatch(login(result) as never);
      reset();
      navigation.navigate('Menu');
    } catch (error) {
      CustomAlert();
      console.error('Error on login:', error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <CustomInput
          control={control}
          label="Cliente"
          name="user"
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
      <CustomBotton title="Ingresar" onClick={handleSubmit(onsubmit)} />
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
