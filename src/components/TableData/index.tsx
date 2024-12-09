import React, {useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
// import {StatusProps} from '../../types';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOrdersByUserId} from '../../api';
import moment from 'moment';
import 'moment/locale/es';
import {ScrollView} from 'react-native-gesture-handler';
import {stateType} from '../../types';
moment.locale('es');

const TableData = () => {
  const formattedDate = (date: any) => {
    return moment(date).format('DD-MMM-YYYY').toLowerCase();
  };
  const {width} = useWindowDimensions();
  const widthCell = width / 4 - Responsive(2.5);
  const navigation = useCustomNavigation();

  const [userId, setUserId] = useState<string>('');
  const [Data, setData] = useState<any>([]);

  const getUserID = async () => {
    try {
      const getuser = await AsyncStorage.getItem('@USER');
      if (getuser) {
        const parsedUser = JSON.parse(getuser);
        setUserId(parsedUser?._id);
      } else {
        console.log('No se encontró el usuario en AsyncStorage');
      }
    } catch (error) {
      console.log('Error al obtener el usuario:', error);
    }
  };

  const getData = async () => {
    try {
      const dataOrderUser = await getOrdersByUserId(userId);
      console.log('TCL: getData -> dataOrderUser', dataOrderUser[0]);
      setData(dataOrderUser);
    } catch (error) {
      console.log('Error al obtener las órdenes:', error);
    }
  };

  useEffect(() => {
    getUserID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDetailOrder = (orderId: string) => {
    navigation.navigate('DetailOrder', {orderId});
  };
  return (
    <View style={styles.container}>
      <ScrollView>
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
        {Data.map((item: any) => (
          <View key={item.id} style={styles.containerBodyTable}>
            <Pressable onPress={() => handleDetailOrder(item.id)}>
              <View style={[styles.containerItem, {width: widthCell}]}>
                <Text style={styles.textCell}>
                  {formattedDate(item?.createdAt)}
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handleDetailOrder(item.id)}>
              <View style={[styles.containerItem, {width: widthCell}]}>
                <Text style={styles.textCell}>{item?.totalPieces} piezas</Text>
              </View>
            </Pressable>
            <View
              style={[
                styles.containerItem,
                {
                  width: widthCell,

                  backgroundColor:
                    item?.status === stateType.PENDING
                      ? Colors.pending_state
                      : Colors.light_green,
                },
              ]}>
              <Text style={[styles.textCell]}>
                {item?.status === stateType.PENDING
                  ? 'SOLICITADO'
                  : 'CAPTURADO'}
              </Text>
            </View>
            <View style={[styles.containerItem, {width: widthCell}]}>
              {item?.folio ? (
                <Text style={styles.textCell}>{item?.folio || 'N/A'}</Text>
              ) : (
                <Pressable
                  onPress={() =>
                    navigation.navigate('NewOrder', {orderId: item?.id})
                  }>
                  <Text style={styles.textCell}>Modificar Eliminar</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
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
