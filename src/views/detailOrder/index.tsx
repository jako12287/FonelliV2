import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackProps} from '../../types';
import {setOrderById} from '../../api';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import Loader from '../../components/Loader';
import CustomBotton from '../../components/CustomBotton';

type DetailOrderScreenRouteProp = RouteProp<RootStackProps, 'DetailOrder'>;

interface DetailOrderProps {
  route: DetailOrderScreenRouteProp;
}
const DetailOrder = ({route}: DetailOrderProps) => {
  const orderId = route.params?.orderId;

  const navigation = useCustomNavigation();

  const [Data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getDataOrder = async () => {
    if (orderId) {
      try {
        const response = await setOrderById(orderId);
        console.log('TCL: en detalles -> response', response);
        setData(response?.order);
      } catch (error) {
        console.error('Error en detalles de orden', error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log('datos detalles', Data.size);
  useEffect(() => {
    getDataOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Pressable onPress={() => navigation.navigate('OrderHistory')}>
          <IconImage size={30} source={Icons.general.arrowBack} />
        </Pressable>
        <Text style={styles.textTitle}>Detalle de la orden</Text>
      </View>

      <View>
        <View style={styles.containerData}>
          <View style={styles.containerTitle}>
            <Text style={styles.textLabel}>Modelo</Text>
          </View>
          <View style={styles.containerGroupItem}>
            <Text style={styles.textData}>{Data?.model}</Text>
          </View>
        </View>

        <View style={styles.containerData}>
          <View style={styles.containerTitle}>
            <Text style={styles.textLabel}>Kilataje</Text>
          </View>
          <View style={styles.containerGroupItem}>
            <Text style={styles.textData}>{Data?.caratage} KILATES</Text>
          </View>
        </View>

        <View style={styles.containerData}>
          <View style={styles.containerTitle}>
            <Text style={styles.textLabel}>Color</Text>
          </View>
          <View style={styles.containerGroupItem}>
            <Text style={styles.textData}>{Data?.color}</Text>
          </View>
        </View>

        {Data?.rock && (
          <View style={styles.containerData}>
            <View style={styles.containerTitle}>
              <Text style={styles.textLabel}>Piedra</Text>
            </View>
            <View
              style={[
                styles.containerGroupItem,
                {paddingRight: Responsive(20)},
              ]}>
              {Data?.rock &&
                Data.rock.map((el: any) => (
                  <View key={el} style={styles.containerItem}>
                    <Text style={styles.textData}>{el}</Text>
                  </View>
                ))}
            </View>
          </View>
        )}

        {Data?.size?.some((el: any) => el.count > 0) && (
          <View
            style={{
              marginTop: Responsive(20),
            }}>
            <View style={styles.containerLabelConditional}>
              <Text style={[styles.textLabel, styles.textCenter]}>Talla</Text>
            </View>
            {Data?.size?.some((el: any) => el.count > 0) &&
              Data.size
                .filter((el: any) => el.count > 0)
                .map((el: any) => (
                  <View key={el.name} style={styles.containerPieceConditional}>
                    <Text style={styles.textNameConditional}>{el.name}</Text>
                    <Text style={styles.textCountConditional}>
                      {el.count} {el.count > 1 ? 'piezas' : 'pieza'}
                    </Text>
                  </View>
                ))
                .reduce((acc: any, curr: any, index: any) => {
                  if (index % 4 === 0) {
                    acc.push([curr]);
                  } else {
                    acc[acc.length - 1].push(curr);
                  }
                  return acc;
                }, [])
                .map((row: any, index: any) => (
                  <View key={index} style={styles.rowConditional}>
                    {row}
                  </View>
                ))}
          </View>
        )}

        {Data?.long?.some((el: any) => el.count > 0) && (
          <View
            style={{
              marginTop: Responsive(20),
            }}>
            <View style={styles.containerLabelConditional}>
              <Text style={[styles.textLabel, styles.textCenter]}>Largo</Text>
            </View>
            {Data?.long?.some((el: any) => el.count > 0) &&
              Data.long
                .filter((el: any) => el.count > 0)
                .map((el: any) => (
                  <View key={el.name} style={styles.containerPieceConditional}>
                    <Text style={styles.textNameConditional}>{el.name} cm</Text>
                    <Text style={styles.textCountConditional}>
                      {el.count} {el.count > 1 ? 'piezas' : 'pieza'}
                    </Text>
                  </View>
                ))
                .reduce((acc: any, curr: any, index: any) => {
                  if (index % 4 === 0) {
                    acc.push([curr]);
                  } else {
                    acc[acc.length - 1].push(curr);
                  }
                  return acc;
                }, [])
                .map((row: any, index: any) => (
                  <View key={index} style={styles.rowConditional}>
                    {row}
                  </View>
                ))}
          </View>
        )}

        {Data?.initialName?.some((el: any) => el.count > 0) && (
          <View
            style={{
              marginTop: Responsive(20),
            }}>
            <View style={styles.containerLabelConditional}>
              <Text style={styles.textLabel}>Inicial</Text>
            </View>
            {Data?.initialName?.some((el: any) => el.count > 0) &&
              Data.initialName
                .filter((el: any) => el.count > 0)
                .map((el: any) => (
                  <View key={el.name} style={styles.containerPieceConditional}>
                    <Text style={styles.textNameConditional}>{el.name}</Text>
                    <Text style={styles.textCountConditional}>
                      {el.count} {el.count > 1 ? 'piezas' : 'pieza'}
                    </Text>
                  </View>
                ))
                .reduce((acc: any, curr: any, index: any) => {
                  if (index % 4 === 0) {
                    acc.push([curr]);
                  } else {
                    acc[acc.length - 1].push(curr);
                  }
                  return acc;
                }, [])
                .map((row: any, index: any) => (
                  <View key={index} style={styles.rowConditional}>
                    {row}
                  </View>
                ))}
          </View>
        )}

        {Data?.name?.some((el: any) => el.count > 0) && (
          <View
            style={{
              marginTop: Responsive(20),
            }}>
            <View style={styles.containerLabelConditional}>
              <Text style={[styles.textLabel, styles.textCenter]}>Nombres</Text>
            </View>
            {Data?.name?.some((el: any) => el.count > 0) &&
              Data.name
                .filter((el: any) => el.count > 0)
                .map((el: any) => (
                  <View key={el.name} style={styles.containerPieceConditional}>
                    <Text style={styles.textNameConditional}>{el.value}</Text>
                    <Text style={styles.textCountConditional}>
                      {el.count} {el.count > 1 ? 'piezas' : 'pieza'}
                    </Text>
                  </View>
                ))
                .reduce((acc: any, curr: any, index: any) => {
                  if (index % 4 === 0) {
                    acc.push([curr]);
                  } else {
                    acc[acc.length - 1].push(curr);
                  }
                  return acc;
                }, [])
                .map((row: any, index: any) => (
                  <View key={index} style={styles.rowConditional}>
                    {row}
                  </View>
                ))}
          </View>
        )}

        <View style={styles.containerData}>
          <View style={styles.containerTitle}>
            <Text style={styles.textLabel}>TOTAL</Text>
          </View>
          <View style={styles.containerGroupItem}>
            <Text style={styles.textTotal}>{Data?.totalPieces} PIEZAS</Text>
          </View>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Observaciones</Text>
          <Text style={styles.textDataObservation}>
            {Data?.observations || ''}
          </Text>
        </View>

        <View style={styles.containerBtn}>
          <CustomBotton
            title="CERRAR"
            color={Colors.light_green}
            colorBottonBG={Colors.dark_green}
            colorText={Colors.white}
            colorShadow={Colors.dark_green}
            onClick={() => navigation.navigate('OrderHistory')}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailOrder;
const styles = StyleSheet.create({
  container: {},
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Responsive(20),
    paddingLeft: Responsive(20),
  },
  textTitle: {
    fontSize: Responsive(24),
    fontFamily: fonts.poppins_bold,
    fontWeight: '900',
    color: Colors.title_color,
  },
  containerData: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Responsive(20),
    paddingRight: Responsive(70),
    marginTop: Responsive(20),
  },
  containerTitle: {
    justifyContent: 'center',
    width: Responsive(100),
  },
  textLabel: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    fontWeight: '500',
    color: Colors.black,
  },
  containerGroupItem: {
    width: Responsive(300),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Responsive(1),
    paddingVertical: Responsive(5),
    gap: Responsive(5),
    flexWrap: 'wrap',
  },
  textData: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.black,
  },
  containerGroup: {
    flexDirection: 'row',
  },
  alingCenter: {alignItems: 'center'},
  containerItem: {
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTotal: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.error_color,
  },
  textDataObservation: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.black,
    width: '60%',
    marginLeft: Responsive(55),
  },
  containerBtn: {
    marginTop: Responsive(30),
    width: '100%',
    height: Responsive(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLabelConditional: {
    alignItems: 'center',
    marginBottom: Responsive(10),
  },
  containerPieceConditional: {
    width: '25%',
    alignItems: 'center',
    marginBottom: Responsive(10),
  },
  textCenter: {textAlign: 'center'},
  textNameConditional: {
    fontSize: Responsive(12),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    textAlign: 'center',
  },
  textCountConditional: {
    fontSize: Responsive(12),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    textAlign: 'center',
    borderRadius: Responsive(5),
    paddingHorizontal: Responsive(10),
  },
  rowConditional: {flexDirection: 'row', flexWrap: 'wrap'},
});
