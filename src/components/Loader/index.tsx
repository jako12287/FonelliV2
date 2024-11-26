import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme/colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.dark_blue}/>
      <Text style={styles.textLoader}>Cargando. Por favor, espera</Text>
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  container: {},
  textLoader: {
    color: Colors.dark_blue,
    fontSize: 22,
    textAlign: 'center',
  },
});
