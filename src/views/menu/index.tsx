import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import CustomBotton from '../../components/CustomBotton';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';
import {CustomAlertLogOut} from '../../utils/alertError';
import {useDispatch} from 'react-redux';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import {logout} from '../../redux/slices/authReducer';

const Menu = () => {
  const dispatch = useDispatch();
  const navigation = useCustomNavigation();
  const goCatalog = () => {
    const url = 'https://fonelli.maldivasweb.com/';

    Linking.openURL(url).catch(err =>
      console.error('Error al abrir la URL:', err),
    );
  };

  const handleLogout = () => {
    CustomAlertLogOut(dispatch, logout, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textTitleContainer}>
        <Text style={styles.title}>Menú</Text>
      </View>
      <View style={styles.containerBtn}>
        <CustomBotton
          title="Realizar Pedido"
          onClick={() => navigation.navigate('NewOrder')}
        />
        <CustomBotton
          title="Historial de pedidos"
          onClick={() => navigation.navigate('OrderHistory')}
        />
        <CustomBotton title="Catálogos" onClick={goCatalog} />
        <CustomBotton title="Cerrar Sesion" onClick={handleLogout} />
      </View>
    </View>
  );
};

export default Menu;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textTitleContainer: {
    width: '100%',
    marginTop: Responsive(30),
    marginBottom: Responsive(20),

    justifyContent: 'flex-start',
  },
  title: {
    fontSize: Responsive(24),
    fontWeight: '800',
    color: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerBtn: {
    flex: 1,
    width: '100%',
    marginBottom: Responsive(20),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
