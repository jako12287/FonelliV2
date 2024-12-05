import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AskAgain from '../../components/AskAgain';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from '../../theme/colors';

interface PropsComponenet {
  setControlerView: (data: number) => void;
  setCount: any;
}
const AppreciationView: FC<PropsComponenet> = ({
  setControlerView,
  setCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../../assets/images/ImageAppreciation.png')}
          style={styles.image}
        />
      </View>

      <View>
        <Text style={styles.textThankYou}>Gracias</Text>
        <Text style={styles.textDown}>
          Te agradecemos tu pedido, juntos seguiremos escribiendo historias
        </Text>
      </View>
      <View>
        <AskAgain
          isComponentForAppreciation
          setControlerView={setControlerView}
          setCount={setCount}
        />
      </View>
    </View>
  );
};

export default AppreciationView;
const styles = StyleSheet.create({
  container: {},
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Responsive(200),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textThankYou: {
    fontSize: Responsive(100),
    fontFamily: fonts.meieScript,
    color: Colors.dark_blue,
    marginBottom: 20,
  },
  textDown: {
    fontSize: Responsive(18),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    lineHeight: Responsive(25),
    textAlign: 'center',
    paddingHorizontal: Responsive(50),
    marginBottom: Responsive(80),
  },
});
