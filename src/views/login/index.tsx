import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import Form from '../../components/Form';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/images/SplashLogo.png')}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.textWelcome}>Bienvenido</Text>
          <Text style={styles.textComplement}>a</Text>
          <Text style={styles.textFonelli}>FONELLI</Text>
        </View>
      </View>
      <View style={styles.containerItem}>
        <Form />
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {flex: 1},
  containerItem: {
    flex: 1.3,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    position: 'relative',
  },
  image: {
    width: Responsive(200),
    height: Responsive(200),
    resizeMode: 'contain',
    opacity: 0.4,
  },
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    opacity: 0.9,
  },
  textWelcome: {
    fontSize: Responsive(50),
    fontFamily: fonts.meieScript,
    color: Colors.dark_blue,
  },
  textComplement: {
    fontSize: Responsive(35),
    fontFamily: fonts.gotham,
    color: Colors.dark_blue,
  },
  textFonelli: {
    fontSize: Responsive(40),
    fontFamily: fonts.cormoram,
    color: Colors.dark_blue,
  },
  conatinerDown: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive(20),
    gap: Responsive(30),
  },
  textDown: {
    fontSize: Responsive(18),
    fontFamily: fonts.poppins_medium,
    color: Colors.dark_blue,
    lineHeight: Responsive(40),
    textAlign: 'center',
  },
  containerTextDown: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive(40),
  },
});
