import React, {useEffect} from 'react';
import {useState} from 'react';
import ViewNewOrder from './ViewNewOrder';
import {StyleSheet, View} from 'react-native';
import SumaryOrder from '../../components/SumaryOrder';
import AppreciationView from './AppreciationView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackProps} from '../../types';
import {RouteProp} from '@react-navigation/native';
import {setOrderById} from '../../api';

type NewOrderScreenRouteProp = RouteProp<RootStackProps, 'NewOrder'>;

interface NewOrderProps {
  route: NewOrderScreenRouteProp;
}
const NewOrder = ({route}: NewOrderProps) => {
  const orderId = route.params?.orderId;

  // const getDataEdit = async () => {
  //   if (orderId) {
  //     try {
  //       const response = await setOrderById(orderId);
  //       console.log('TCL: getDataEdit -> response', response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  console.log('orderId: orderId -> orderId', orderId);
  useEffect(() => {
    if (orderId) {
      getDataEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);
  const [controlerView, setControlerView] = useState<number>(1);

  const [model, setModel] = useState<string>('');
  const [caratage, setCaratage] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [rock, setRock] = useState<string>('');
  const [totalPieces, setTotalPieces] = useState<string>('0');
  const [observations, setObservations] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  //main state size componen
  const [totalPiecesInSize, setTotalPiecesInSize] = useState<number>(0);
  const [totalPiecesInLong, setTotalPiecesInLong] = useState<number>(0);
  const [totalPiecesInName, setTotalPiecesInName] = useState<any>(0);
  const [totalPiecesInInitial, setTotalPiecesInInitial] = useState<any>(0);

  //state globlas
  const [stateGlobalSize, setStateGlobalSize] = useState<any[]>([
    {count: 0, name: '4'},
  ]);
  const [stateGlobalInitial, setStateGlobalInitial] = useState<any[]>([
    {count: 0, name: 'A'},
  ]);
  const [stateGlobalLong, setStateGlobalLong] = useState<any[]>([
    {count: 0, name: '18'},
  ]);
  const [stateGlobalName, setStateGlobalName] = useState([
    {name: 'name1', value: '', count: 0},
  ]);

  //states show
  const [showLong, setShowLong] = useState<boolean>(false);
  const [showInitialName, setShowInitialName] = useState<boolean>(false);
  const [showName, setShowName] = useState<boolean>(false);
  const [showPieceTotal, setShowPieceTotal] = useState<boolean>(false);
  const [_, setCount] = useState(0);

  const reloadView = () => {
    setCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    reloadView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

  const orderCurrent: any = {
    userId,
    model,
    caratage,
    color,
    rock,
    observations,
  };
  if (!showLong) {
    orderCurrent.size = stateGlobalSize;
  }
  if (showLong) {
    orderCurrent.long = stateGlobalLong;
  }
  if (!showInitialName) {
    orderCurrent.initialName = stateGlobalInitial;
  }
  if (!showName) {
    orderCurrent.initialName = stateGlobalInitial;
  }
  if (showName) {
    orderCurrent.name = stateGlobalName;
  }
  if (showPieceTotal) {
    orderCurrent.totalPieces = totalPieces;
  }

  const getDataEdit = async () => {
    if (orderId) {
      try {
        const response = await setOrderById(orderId);

        if (response?.order) {
          setModel(response?.order?.model || '');
          setCaratage(response?.order?.caratage?.slice(0, 2) || '');
          setColor(response?.order?.color);
          setRock(response?.order?.rock);
          if (Array.isArray(response?.order?.size)) {
            setStateGlobalSize(response.order.size);
          } else {
            console.error('El campo size no es un array válido.');
            setStateGlobalSize([]);
          }
          if (Array.isArray(response?.order?.initialName)) {
            setStateGlobalInitial(response?.order?.initialName);
          } else {
            console.error('El campo size no es un array válido.');
            setStateGlobalInitial([]);
          }
          if (Array.isArray(response?.order?.long)) {
            setStateGlobalLong(response?.order?.long);
          } else {
            console.error('El campo size no es un array válido.');
            setStateGlobalLong([]);
          }
          if (Array.isArray(response?.order?.name)) {
            setStateGlobalName(response?.order?.name);
          } else {
            console.error('El campo size no es un array válido.');
            setStateGlobalName([]);
          }
          if (response?.order?.totalPieces) {
            setTotalPieces(response?.order?.totalPieces?.toString() || '0');
          } else {
            setTotalPieces('0');
          }
          setObservations(response?.order?.observations || '');
        }
      } catch (error) {
        console.log('Error fetching order data:', error);
      }
    }
  };
  // console.log('orderCurrent', orderCurrent);
  return (
    <View style={styles.container}>
      {controlerView === 1 && (
        <ViewNewOrder
          orderId={orderId}
          showPieceTotal={showPieceTotal}
          setShowPieceTotal={setShowPieceTotal}
          setTotalPiecesInInitial={setTotalPiecesInInitial}
          totalPiecesInInitial={totalPiecesInInitial}
          setTotalPiecesInName={setTotalPiecesInName}
          totalPiecesInName={totalPiecesInName}
          setStateGlobalName={setStateGlobalName}
          stateGlobalName={stateGlobalName}
          setShowInitialName={setShowInitialName}
          setShowLong={setShowLong}
          setShowName={setShowName}
          showInitialName={showInitialName}
          showLong={showLong}
          showName={showName}
          setStateGlobalInitial={setStateGlobalInitial}
          setStateGlobalLong={setStateGlobalLong}
          setStateGlobalSize={setStateGlobalSize}
          stateGlobalInitial={stateGlobalInitial}
          stateGlobalLong={stateGlobalLong}
          stateGlobalSize={stateGlobalSize}
          setTotalPiecesInLong={setTotalPiecesInLong}
          totalPiecesInLong={totalPiecesInLong}
          setTotalPiecesInSize={setTotalPiecesInSize}
          totalPiecesInSize={totalPiecesInSize}
          setControlerView={setControlerView}
          userEmail={userEmail}
          setCaratage={setCaratage}
          caratage={caratage}
          setColor={setColor}
          color={color}
          setModel={setModel}
          model={model}
          setObservations={setObservations}
          observations={observations}
          setRock={setRock}
          rock={rock}
          setTotalPieces={setTotalPieces}
          totalPieces={totalPieces}
        />
      )}
      {controlerView === 2 && (
        <SumaryOrder
          handleDataUpdate={reloadView}
          showInitialName={showInitialName}
          showName={showName}
          showLong={showLong}
          setControlerView={setControlerView}
          dataSend={orderCurrent}
          orderId={orderId || ''}
        />
      )}
      {controlerView === 3 && (
        <AppreciationView
          setControlerView={setControlerView}
          setCount={setCount}
        />
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
