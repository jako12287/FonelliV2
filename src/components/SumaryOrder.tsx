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

interface PropsComponenet {
  setControlerView: (data: number) => void;
  dataSend: any;
  showLong: boolean;
  showInitialName: boolean;
  showName: boolean;
  handleDataUpdate: () => void;
}
const SumaryOrder: FC<PropsComponenet> = ({
  setControlerView,
  dataSend,
  showLong,
  showInitialName,
  showName,
  handleDataUpdate,
}) => {
  const [loadind, setLoading] = useState<boolean>(true);

  const totalPiecesCalc = () => {
    let total = 0;
    if (showLong) {
      total += dataSend?.long?.reduce(
        (acc: number, curr: any) => acc + curr.count,
        0,
      );
    }
    if (!showLong) {
      total += dataSend?.size?.reduce(
        (acc: number, curr: any) => acc + curr.count,
        0,
      );
    }
    if (showLong && showInitialName) {
      total += dataSend?.initialName?.reduce(
        (acc: number, curr: any) => acc + curr.count,
        0,
      );
    }
    if (showLong && showName) {
      total += dataSend?.name?.reduce(
        (acc: number, curr: any) => acc + curr.count,
        0,
      );
    }
    return total;
  };

  useEffect(() => {
    console.log('dataSend', dataSend);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [dataSend]);

  const onSubmit = () => {
    const data = {
      totalPieces: dataSend?.totalPieces || totalPiecesCalc(),
      ...dataSend,
    };
    console.log('data', data);
    handleDataUpdate();
    setControlerView(3);
  };

  if (loadind) {
    return (
      <View style={[styles.container, styles.containerExtension]}>
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
            <Text style={styles.textLabel}>Modelo</Text>
            <Text style={styles.textData}>{dataSend?.model}</Text>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Kilataje</Text>
            <Text style={styles.textData}>{dataSend?.caratage} KILATES</Text>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Color</Text>
            <Text style={styles.textData}>{dataSend?.color}</Text>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Piedra</Text>
            <Text style={styles.textData}>
              {dataSend?.rock === 'N/A' ? 'NO APLICA' : dataSend?.rock}
            </Text>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Talla</Text>
            {/* <View style={[styles.containerSize]}>
            <Text style={styles.textData}>
              {!dataSend?.size ||
                (!dataSend?.size?.filter((el: any) => el?.count).length &&
                  'NO APLICA')}
            </Text>
            {dataSend?.size &&
              dataSend?.size
                .filter((el: any) => el.count)
                .map((item: any) => (
                  <View style={styles.containerSizeText}>
                    <Text style={[styles.textData]}>{item.name}</Text>
                    <Text style={[styles.textData]}>{item.count}</Text>
                    <Text style={[styles.textData]}>piezas</Text>
                  </View>
                ))}
          </View> */}
            <View style={[styles.containerInitials, {flexWrap: 'wrap'}]}>
              {dataSend?.size?.length > 0 &&
              dataSend?.size?.some((el: any) => el.count > 0) ? (
                dataSend.size
                  .filter((el: any) => el.count > 0)
                  .map((el: any) => (
                    <View
                      key={el.name}
                      style={[styles.copnstainerIntInitial, {width: 80}]}>
                      <Text style={styles.textData}>{el.name}</Text>
                      <Text style={styles.textData}>{el.count} piezas</Text>
                    </View>
                  ))
              ) : (
                <Text>NO APLICA</Text>
              )}
            </View>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Largo</Text>
            {/* <View style={{flexWrap: 'wrap', gap: 20}}>
            {!dataSend?.long
              ? 'NO APLICA'
              : dataSend?.long
                  ?.filter((el: any) => el.count > 0)
                  .map((el: any) => (
                    <View
                      style={[
                        styles.copnstainerIntInitial,
                        {flexWrap: 'wrap', width: 50},
                      ]}>
                      <Text
                        style={[
                          styles.textData,
                          {flexDirection: 'row', width: 60},
                        ]}>
                        {el.name} cm
                      </Text>
                      <Text style={[styles.textData, {width: 70}]}>
                        {el.count} piezas
                      </Text>
                    </View>
                  ))}
          </View> */}
            <View
              style={[styles.containerInitials, {width: 60, flexWrap: 'wrap'}]}>
              {showLong &&
              dataSend?.long?.length > 0 &&
              dataSend?.long?.some((el: any) => el.count > 0) ? (
                dataSend.long
                  .filter((el: any) => el.count > 0)
                  .map((el: any) => (
                    <View
                      key={el.name}
                      style={[
                        styles.copnstainerIntInitial,
                        {width: 90, flexWrap: 'wrap'},
                      ]}>
                      <Text style={styles.textData}>{el.name}</Text>
                      <Text style={styles.textData}>{el.count} piezas</Text>
                    </View>
                  ))
              ) : (
                <Text>NO APLICA</Text>
              )}
            </View>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Inicial</Text>
            <View style={styles.containerInitials}>
              {dataSend?.initialName?.length > 0 &&
              dataSend?.initialName?.some((el: any) => el.count > 0) ? (
                dataSend.initialName
                  .filter((el: any) => el.count > 0)
                  .map((el: any) => (
                    <View key={el.name} style={styles.copnstainerIntInitial}>
                      <Text style={styles.textData}>{el.name}</Text>
                      <Text style={styles.textData}>{el.count}</Text>
                    </View>
                  ))
              ) : (
                <Text>NO APLICA</Text>
              )}
            </View>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>Nombres</Text>
            <View style={styles.containerInitials}>
              {dataSend?.name?.length > 0 &&
              dataSend?.name?.some((el: any) => el.count > 0) ? (
                dataSend.name
                  .filter((el: any) => el.count > 0)
                  .map((el: any) => (
                    <View
                      key={el.name}
                      style={[
                        styles.copnstainerIntInitial,
                        {width: 80, flexWrap: 'wrap'},
                      ]}>
                      <Text style={styles.textData}>{el.value}</Text>
                      <Text style={styles.textData}>{el.count} piezas</Text>
                    </View>
                  ))
              ) : (
                <Text>NO APLICA</Text>
              )}
            </View>
          </View>

          <View style={styles.containerData}>
            <Text style={styles.textLabel}>TOTAL</Text>
            <Text style={styles.textTotal}>
              {dataSend?.totalPieces || totalPiecesCalc()} PIEZAS
            </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerExtension: {height: Responsive(600), justifyContent: 'center'},
  containerSize: {
    width: Responsive(300),
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: Responsive(5),
  },
  containerSizeText: {
    flexDirection: 'row',
    gap: Responsive(20),
    paddingEnd: Responsive(40),
  },
  containerInitials: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Responsive(15),
    width: '50%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  copnstainerIntInitial: {
    // borderColor: Colors.gray_shadow,
    // borderWidth: Responsive(2),
    width: Responsive(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
