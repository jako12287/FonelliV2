import React from 'react';
import {useState} from 'react';
import ViewNewOrder from './ViewNewOrder';
import {StyleSheet, View} from 'react-native';
import SumaryOrder from '../../components/SumaryOrder';
import AppreciationView from './AppreciationView';


const NewOrder = () => {
  const [controlerView, setControlerView] = useState<number>(1);
  return (
    <View style={styles.container}>
      {controlerView === 1 && <ViewNewOrder setControlerView={setControlerView} />}
      {controlerView === 2 && <SumaryOrder setControlerView={setControlerView}/>}
      {controlerView === 3 && <AppreciationView setControlerView={setControlerView} />}
    </View>
  );
};

export default NewOrder;
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: Responsive(20),
  },
});
