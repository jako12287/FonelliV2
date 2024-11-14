import './gesture-handler';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import Router from './src/routes';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const {width} = useWindowDimensions();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles({width}).safeArea}>
        <StatusBar barStyle={'default'} />
        <Router />
        <StatusBar />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = ({width}: any) => ({
  safeArea: {
    flex: 1,
    width: width,
    marginTop: Platform.OS !== 'android' ? 30 : 0,
  },
});
