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
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const {width} = useWindowDimensions();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles({width}).safeArea}>
          <StatusBar barStyle={'default'} />
          <Router />
          <StatusBar />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
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
