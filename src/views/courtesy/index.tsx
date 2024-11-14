import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Responsive from '../../utils/responsive';
import CustomBotton from '../../components/CustomBotton';

const Courtesy = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/SplashLogo.png')}
        style={styles.image}
      />
      <CustomBotton title="Iniciar sesión" />
    </View>
  );
};

export default Courtesy;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  image: {
    width: Responsive(220),
    height: Responsive(220),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Responsive(100),
    marginBottom: Responsive(100),
  },
});
