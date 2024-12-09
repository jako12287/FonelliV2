import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Easing, Text} from 'react-native';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from '../../theme/colors';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
// import {useDispatch} from 'react-redux';
// import {loadUserData} from '../../redux/slices/authReducer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getVerifyStatusServer} from '../../utils/statusServer';

const Splash = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const navigation = useCustomNavigation();
  // const dispatch = useDispatch();

  // const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getVerifyStatusServer();
  }, []);

  const loaderToken = async () => {
    navigation.navigate('Courtesy');
    // try {
    //   const tokenLocal = await AsyncStorage.getItem('@TOKEN');
    //   setTimeout(async () => {
    //     if (tokenLocal) {
    //       await dispatch(loadUserData() as never);
    //       navigation.navigate('Menu');
    //     } else {
    //       navigation.navigate('Courtesy');
    //     }
    //   }, 3000);
    // } catch (error) {
    //   console.log('error a acceder al token', error);
    // }
  };

  useEffect(() => {
    loaderToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        style={[styles.image, {transform: [{scale: scaleValue}]}]}
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
