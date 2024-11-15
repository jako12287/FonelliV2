import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TableData from '../../components/TableData';
import AskAgain from '../../components/AskAgain';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';

const OrderHistory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerUp}>
        <Text style={styles.textTitle}>Historial de pedidos</Text>
        <TableData />
      </View>
      <View style={styles.containerDown}>
        <AskAgain />
      </View>
    </View>
  );
};

export default OrderHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerUp: {
    flex: 2,
    justifyContent: 'center',
    gap: Responsive(20),
  },
  containerDown: {
    flex: 1,
  },
  textTitle: {
    color: Colors.light_blue,
    fontSize: Responsive(28),
    fontFamily: fonts.poppins_bold,
    fontWeight: '800',
    flexShrink: 1,
    textAlign: 'center',
  },
});
