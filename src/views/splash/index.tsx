import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Easing, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { logout } from '../../redux/slices/authReducer';
import Responsive from '../../utils/responsive';
import { fonts } from '../../theme/fonts';
import { Colors } from '../../theme/colors';

const Splash = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useCustomNavigation();

  useEffect(() => {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.log('Error al limpiar AsyncStorage', error);
      }
    };

    clearAsyncStorage();
    logout();

    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Courtesy' }],
      });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  useEffect(() => {
    const animatePulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animatePulse();
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/SplashLogo.png')}
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
      />
      <View style={styles.containerText}>
        <Text style={styles.text}>FONELLI</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: Responsive(200),
    height: Responsive(200),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Responsive(100),
    marginBottom: Responsive(100),
    opacity: 0.3,
  },
  containerText: {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Responsive(40),
    fontFamily: fonts.cormoram,
    color: Colors.dark_blue,
    textAlign: 'center',
    paddingBottom: Responsive(50),
  },
});
