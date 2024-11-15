import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StatusProps} from '../../types';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';

interface fakeDataProps {
  _id: string;
  date: string;
  piezas: number;
  status: StatusProps;
  folio: null | string;
}

const fakeData: fakeDataProps[] = [
  {
    _id: '001',
    date: '20-10-2024',
    piezas: 10,
    status: StatusProps.PENDING,
    folio: null,
  },
  {
    _id: '002',
    date: '20-10-2024',
    piezas: 3,
    status: StatusProps.PENDING,
    folio: null,
  },
  {
    _id: '003',
    date: '15-10-2024',
    piezas: 7,
    status: StatusProps.CAUTGHT,
    folio: '134864',
  },
];

const TableData = () => {
  const {width} = useWindowDimensions();
  const widthCell = width / 4 - Responsive(2.5);
  const navigation = useCustomNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.containerTitle, {width: widthCell}]}>
          <Text style={styles.textTitle}>Fecha</Text>
        </View>
        <View style={[styles.containerTitle, {width: widthCell}]}>
          <Text style={styles.textTitle}>Piezas</Text>
        </View>
        <View style={[styles.containerTitle, {width: widthCell}]}>
          <Text style={styles.textTitle}>Estatus</Text>
        </View>
        <View style={[styles.containerTitle, {width: widthCell}]}>
          <Text style={styles.textTitle}>Folio</Text>
        </View>
      </View>

      {/* Rows */}
      {fakeData.map(item => (
        <View key={item._id} style={styles.containerBodyTable}>
          <View style={[styles.containerItem, {width: widthCell}]}>
            <Text style={styles.textCell}>{item.date}</Text>
          </View>
          <View style={[styles.containerItem, {width: widthCell}]}>
            <Text style={styles.textCell}>{item.piezas} piezas</Text>
          </View>
          <View
            style={[
              styles.containerItem,
              {
                width: widthCell,

                backgroundColor:
                  item?.status === 'PENDING'
                    ? Colors.pending_state
                    : Colors.light_green,
              },
            ]}>
            <Text style={[styles.textCell]}>
              {item?.status === 'PENDING' ? 'PENDIENTE' : 'CAPTURADO'}
            </Text>
          </View>
          <View style={[styles.containerItem, {width: widthCell}]}>
            {item?.folio ? (
              <Text style={styles.textCell}>{item?.folio}</Text>
            ) : (
              <Pressable onPress={() => navigation.navigate('NewOrder')}>
                <Text style={styles.textCell}>Modificar Eliminar</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TableData;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.gray_table_bg,
    height: Responsive(40),
  },
  containerTitle: {
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: Responsive(40),
  },
  textTitle: {
    fontSize: Responsive(12),
    fontFamily: fonts.poppins_bold,
    color: Colors.white,
  },
  textCell: {
    fontSize: Responsive(12),
    fontFamily: fonts.gotham,
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    color: Colors.black,
    textAlign: 'center',
  },
  containerBodyTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Responsive(40),
  },
  containerItem: {
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: Responsive(40),
  },
});
