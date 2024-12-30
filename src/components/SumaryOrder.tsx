import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import IconImage from '../utils/iconImage';
import {Icons} from '../assets/icons';
import Responsive from '../utils/responsive';
import {fonts} from '../theme/fonts';
import {Colors} from '../theme/colors';
import CustomBotton from './CustomBotton';
import Loader from './Loader';
import {ScrollView} from 'react-native-gesture-handler';
import {createOrder, editOrder} from '../api';
import {PropsShow} from '../types';

interface PropsComponenet {
  setControlerView: (data: number) => void;
  dataSend: any;
  handleDataUpdate: () => void;
  orderId: string;
  setModel: (data: string) => void;
  setCaratage: (data: string) => void;
  setColor: (data: string) => void;
  setRock: any;
  setStateGlobalSize: any;
  setStateGlobalInitial: any;
  setStateGlobalLong: any;
  setStateGlobalName: any;
  setObservations: any;
  setTotalPieces: any;
  stateShow: PropsShow;
}
const SumaryOrder: FC<PropsComponenet> = ({
  setControlerView,
  dataSend,
  handleDataUpdate,
  orderId,
  setModel,
  setCaratage,
  setColor,
  setRock,
  setStateGlobalSize,
  setStateGlobalInitial,
  setStateGlobalLong,
  setStateGlobalName,
  setObservations,
  setTotalPieces,
  stateShow,
}) => {
  const [loadind, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [dataSend]);

  const createOrEdit = async (data: any) => {
    try {
      if (orderId !== '') {
        return await editOrder(orderId, data);
      } else {
        return await createOrder(data);
      }
    } catch (error: any) {
      console.error('Error en createOrEdit:', error.message || error);
      throw error;
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    const data = {
      ...dataSend,
    };

    console.log('data send en sumary', dataSend);
    try {
      await createOrEdit(data);
      handleDataUpdate();
      setControlerView(3);
      setModel('');
      setCaratage('');
      setColor('');
      setRock([]);
      setStateGlobalSize([{count: 0, name: '4'}]);
      setStateGlobalInitial([{count: 0, name: 'A'}]);
      setStateGlobalLong([{count: 0, name: '18'}]);
      setStateGlobalName([{name: 'name1', value: '', count: 0}]);
      setObservations('');
      setTotalPieces('1');
    } catch (error) {
      console.log('Error al crear la orden:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loadind) {
    return (
      <View style={[styles.container]}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerHeader}>
          <Pressable onPress={() => setControlerView(1)}>
            <IconImage size={30} source={Icons.general.arrowBack} />
          </Pressable>
          <Text style={styles.textTitle}>Resumen</Text>
        </View>
        <View>
          <View style={styles.containerData}>
            <View style={styles.containerTitle}>
              <Text style={styles.textLabel}>Modelo</Text>
            </View>
            <View style={styles.containerGroupItem}>
              <Text style={styles.textData}>{dataSend?.model}</Text>
            </View>
          </View>

          <View style={styles.containerData}>
            <View style={styles.containerTitle}>
              <Text style={styles.textLabel}>Kilataje</Text>
            </View>
            <View style={styles.containerGroupItem}>
              <Text style={styles.textData}>{dataSend?.caratage} KILATES</Text>
            </View>
          </View>

          <View style={styles.containerData}>
            <View style={styles.containerTitle}>
              <Text style={styles.textLabel}>Color</Text>
            </View>
            <View style={styles.containerGroupItem}>
              <Text style={styles.textData}>{dataSend?.color}</Text>
            </View>
          </View>

          {dataSend?.rock && (
            <View style={styles.containerData}>
              <View style={styles.containerTitle}>
                <Text style={styles.textLabel}>Piedra</Text>
              </View>
              <View
                style={[
                  styles.containerGroupItem,
                  {paddingRight: Responsive(20)},
                ]}>
                {dataSend?.rock &&
                  dataSend.rock.map((el: any) => (
                    <View key={el} style={styles.containerItem}>
                      <Text style={styles.textData}>{el}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}

          {stateShow.size &&
            !stateShow.long &&
            !stateShow.initialName &&
            !stateShow.name && (
              <View
                style={{
                  marginTop: Responsive(20),
                }}>
                <View style={styles.containerLabelConditional}>
                  <Text style={[styles.textLabel, styles.textCenter]}>
                    Talla
                  </Text>
                </View>
                {dataSend?.size?.some((el: any) => el.count > 0) &&
                  dataSend.size
                    .filter((el: any) => el.count > 0)
                    .map((el: any) => (
                      <View
                        key={el.name}
                        style={styles.containerPieceConditional}>
                        <Text style={styles.textNameConditional}>
                          {el.name}
                        </Text>
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
          {!stateShow.size &&
            stateShow.long &&
            !stateShow.initialName &&
            !stateShow.name && (
              <View
                style={{
                  marginTop: Responsive(20),
                }}>
                <View style={styles.containerLabelConditional}>
                  <Text style={[styles.textLabel, styles.textCenter]}>
                    Largo
                  </Text>
                </View>
                {dataSend?.long?.some((el: any) => el.count > 0) &&
                  dataSend.long
                    .filter((el: any) => el.count > 0)
                    .map((el: any) => (
                      <View
                        key={el.name}
                        style={styles.containerPieceConditional}>
                        <Text style={styles.textNameConditional}>
                          {el.name} cm
                        </Text>
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

          {!stateShow.size &&
            !stateShow.long &&
            stateShow.initialName &&
            !stateShow.name && (
              <View
                style={{
                  marginTop: Responsive(20),
                }}>
                <View style={styles.containerLabelConditional}>
                  <Text style={styles.textLabel}>Inicial</Text>
                </View>
                {dataSend?.initialName?.some((el: any) => el.count > 0) &&
                  dataSend.initialName
                    .filter((el: any) => el.count > 0)
                    .map((el: any) => (
                      <View
                        key={el.name}
                        style={styles.containerPieceConditional}>
                        <Text style={styles.textNameConditional}>
                          {el.name}
                        </Text>
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

          {/* {!stateShow.size &&
            !stateShow.long &&
            !stateShow.initialName &&
            stateShow.name && (
              <View style={styles.containerData}>
                <View style={styles.containerTitle}>
                  <Text style={styles.textLabel}>Nombres</Text>
                </View>
                <View style={styles.containerGroupItem}>
                  {dataSend?.name?.some((el: any) => el.count > 0) &&
                    dataSend.name
                      .filter((el: any) => el.count > 0)
                      .map((el: any) => (
                        <View key={el.name} style={styles.containerItem}>
                          <Text style={styles.textData}>{el.value}</Text>
                          <Text style={styles.textData}>
                            {el.count} {el.count > 1 ? 'piezas' : 'pieza'}
                          </Text>
                        </View>
                      ))}
                </View>
              </View>
            )} */}
          {!stateShow.size &&
            !stateShow.long &&
            !stateShow.initialName &&
            stateShow.name && (
              <View
                style={{
                  marginTop: Responsive(20),
                }}>
                <View style={styles.containerLabelConditional}>
                  <Text style={[styles.textLabel, styles.textCenter]}>
                    Nombres
                  </Text>
                </View>
                {dataSend?.name?.some((el: any) => el.count > 0) &&
                  dataSend.name
                    .filter((el: any) => el.count > 0)
                    .map((el: any) => (
                      <View
                        key={el.name}
                        style={styles.containerPieceConditional}>
                        <Text style={styles.textNameConditional}>
                          {el.value}
                        </Text>
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
              <Text style={styles.textTotal}>
                {dataSend?.totalPieces}{' '}
                {dataSend?.totalPieces > 1 ? 'PIEZAS' : 'PIEZA'}
              </Text>
            </View>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Observaciones</Text>
            <Text style={styles.textDataObservation}>
              {dataSend?.observations || ''}
            </Text>
          </View>

          <View style={styles.containerBtn}>
            <CustomBotton
              title="ENVIAR"
              color={Colors.light_green}
              colorBottonBG={Colors.dark_green}
              colorText={Colors.white}
              colorShadow={Colors.dark_green}
              onClick={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SumaryOrder;
const styles = StyleSheet.create({
  container: {},
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Responsive(20),
    paddingLeft: Responsive(20),
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
  textTitle: {
    fontSize: Responsive(24),
    fontFamily: fonts.poppins_bold,
    fontWeight: '900',
    color: Colors.title_color,
  },
  textLabel: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    fontWeight: '500',
    color: Colors.black,
  },
  textData: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.black,
  },
  textDataObservation: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.black,
    width: '60%',
    marginLeft: Responsive(55),
  },
  textTotal: {
    fontSize: Responsive(16),
    fontFamily: fonts.gotham,
    color: Colors.error_color,
  },
  containerBtn: {
    marginTop: Responsive(30),
    width: '100%',
    height: Responsive(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  copnstainerIntInitial: {
    width: Responsive(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap80: {
    flexWrap: 'wrap',
    width: '80%',
  },
  containerGroup: {
    flexDirection: 'row',
  },
  containerTitle: {
    justifyContent: 'center',
    width: Responsive(100),
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
  containerItem: {
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alingCenter: {alignItems: 'center'},
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
