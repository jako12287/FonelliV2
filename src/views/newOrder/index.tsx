import React, {useEffect} from 'react';
import {useState} from 'react';
import ViewNewOrder from './ViewNewOrder';
import {StyleSheet, View} from 'react-native';
import SumaryOrder from '../../components/SumaryOrder';
import AppreciationView from './AppreciationView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewOrder = () => {
  const [controlerView, setControlerView] = useState<number>(1);

  const [model, setModel] = useState<string>('');
  const [caratage, setCaratage] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [rock, setRock] = useState<string>('');
  const [size, setSize] = useState<string[]>(['N/A']);
  const [long, setLong] = useState<string[]>(['N/A']);
  const [initialName, setInitialName] = useState<string[]>(['N/A']);
  const [name, setName] = useState<string[]>(['N/A']);
  const [totalPieces, setTotalPieces] = useState<string>('12');
  const [observations, setObservations] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  //main state size componen

  const orderCurrent = {
    userId,
    model,
    caratage,
    color,
    rock,
    size,
    long,
    initialName,
    name,
    totalPieces,
    observations,
  };

  useEffect(() => {
    console.log('esto es size desde neworder', size);
  }, [size]);

  useEffect(() => {
    const getUser = async () => {
      const response = await AsyncStorage.getItem('@USER');
      if (response) {
        const user = JSON.parse(response);
        setUserEmail(`${user.email}`);
        setUserId(`${user._id}`);
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {controlerView === 1 && (
        <ViewNewOrder
          setControlerView={setControlerView}
          userEmail={userEmail}
          setCaratage={setCaratage}
          caratage={caratage}
          setInitialName={setInitialName}
          initialName={initialName}
          setColor={setColor}
          color={color}
          setLong={setLong}
          long={long}
          setModel={setModel}
          model={model}
          setName={setName}
          name={name}
          setObservations={setObservations}
          observations={observations}
          setRock={setRock}
          rock={rock}
          setSize={setSize}
          size={size}
          setTotalPieces={setTotalPieces}
          totalPieces={totalPieces}
        />
      )}
      {controlerView === 2 && (
        <SumaryOrder
          setControlerView={setControlerView}
          dataSend={orderCurrent}
        />
      )}
      {controlerView === 3 && (
        <AppreciationView setControlerView={setControlerView} />
      )}
    </View>
  );
};

export default NewOrder;
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: Responsive(20),
  },
});
