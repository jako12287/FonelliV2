import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import IconImage from '../utils/iconImage';
import {Icons} from '../assets/icons';
import Responsive from '../utils/responsive';
import {fonts} from '../theme/fonts';
import {Colors} from '../theme/colors';
import CustomBotton from './CustomBotton';
import Loader from './Loader';

interface PropsComponenet {
  setControlerView: (data: number) => void;
  dataSend: any;
}
const SumaryOrder: FC<PropsComponenet> = ({setControlerView, dataSend}) => {
  console.log('TCL: dataSend sumary', dataSend);

  const [loadind, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [dataSend]);

  console.log('asi se ve talla', dataSend);

  if (loadind) {
    return (
      <View style={[styles.container, styles.containerExtension]}>
        <Loader />
      </View>
    );
  }
  return (
    <View style={styles.container}>
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
          <Text style={styles.textData}>{dataSend?.rock}</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Talla</Text>
          <View style={[styles.containerSize]}>
            <Text style={styles.textData}>
              {!dataSend?.size ||
                (!dataSend?.size.filter((el: any) => el?.count).length &&
                  'NO APLICA')}
            </Text>
            {dataSend?.size
              .filter((el: any) => el.count)
              .map((item: any) => (
                <View style={styles.containerSizeText}>
                  <Text style={[styles.textData]}>{item.name}</Text>
                  <Text style={[styles.textData]}>{item.count}</Text>
                  <Text style={[styles.textData]}>piezas</Text>
                </View>
              ))}
            {/*
            <Text style={styles.textData}>9 1/2 3 piezas</Text> */}
          </View>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Largo</Text>
          <Text style={styles.textData}>NO APLICA</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Inicial</Text>
          <Text style={styles.textData}>NO APLICA</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Nombres</Text>
          <Text style={styles.textData}>NO APLICA</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>TOTAL</Text>
          <Text style={styles.textTotal}>5 PIEZAS</Text>
        </View>

        <View style={styles.containerData}>
          <Text style={styles.textLabel}>Observaciones</Text>
          <Text style={styles.textDataObservation}>
            Se necesitan para antes del 20 de octubre del 2024
          </Text>
        </View>

        <View style={styles.containerBtn}>
          <CustomBotton
            title="ENVIAR"
            color={Colors.light_green}
            colorBottonBG={Colors.dark_green}
            colorText={Colors.white}
            colorShadow={Colors.dark_green}
            onClick={() => setControlerView(3)}
          />
        </View>
      </View>
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
});
