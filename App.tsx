import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const App = () => {
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles({width}).safeArea}>
      <StatusBar barStyle={'default'} />
      <View style={styles({width}).container}>
        <Text>App modificada</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
const styles = ({width}: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      width,
      marginTop: Platform.OS !== 'android' ? 30 : 0,
    },
    container: {
      // borderColor: 'red',
      // borderWidth: 2,
      flex: 1,
    },
  });
