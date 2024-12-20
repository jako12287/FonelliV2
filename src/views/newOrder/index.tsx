import React, {useEffect} from 'react';
import {useState} from 'react';
import ViewNewOrder from './ViewNewOrder';
import {StyleSheet, View} from 'react-native';
import SumaryOrder from '../../components/SumaryOrder';
import AppreciationView from './AppreciationView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PropsShow, RootStackProps} from '../../types';
import {RouteProp} from '@react-navigation/native';
import {setOrderById} from '../../api';
import {determineTotalPieces} from '../../utils/determinatePieces';

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
  const [rock, setRock] = useState<string[]>([]);
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
  const [stateGlobalName, setStateGlobalName] = useState<any[]>([
    {name: 'name1', value: '', count: 0},
  ]);

  //states show
  const [showLong, setShowLong] = useState<boolean>(false);
  const [showInitialName, setShowInitialName] = useState<boolean>(false);
  const [showName, setShowName] = useState<boolean>(false);
  const [showNameNA, setShowNameNA] = useState<boolean>(true);
  const [showPieceTotal, setShowPieceTotal] = useState<boolean>(false);

  const [_, setCount] = useState(0);

  const reloadView = () => {
    setCount(prevCount => prevCount + 1);
  };

  // states news controller views
  const [stateShow, setStateShow] = useState<PropsShow>({
    size: true,
    long: true,
    initialName: true,
    name: true,
    pieceTotal: true,
  });

  // useEffect(() => {
  //   reloadView();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [count]);
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
    observations,
    email: userEmail,
  };
  if (rock.length > 0 && rock[0] !== 'N/A') {
    orderCurrent.rock = rock;
  }
  if (!showLong) {
    orderCurrent.size = stateGlobalSize;
  }
  if (stateShow.long && stateGlobalLong?.length > 0) {
    orderCurrent.long = stateGlobalLong;
  }
  if (stateShow.initialName && stateGlobalInitial.length > 0) {
    orderCurrent.initialName = stateGlobalInitial;
  }

  if (stateShow.name && !showNameNA) {
    orderCurrent.name = stateGlobalName;
  }
  if (showPieceTotal) {
    orderCurrent.totalPieces = totalPieces;
  } else if (!showPieceTotal) {
    orderCurrent.totalPieces = determineTotalPieces({
      stateShow,
      totalPieces,
      totalPiecesInInitial,
      totalPiecesInLong,
      totalPiecesInName,
      totalPiecesInSize,
    });
  }
  const getDataEdit = async () => {
    if (orderId) {
      try {
        const response = await setOrderById(orderId);

        if (response?.order) {
          setModel(response?.order?.model || '');
          setCaratage(response?.order?.caratage?.slice(0, 2) || '');
          setColor(response?.order?.color);
          if (Array.isArray(response?.order?.rock)) {
            setRock(response?.order?.rock);
          } else {
            console.error('El campo rock no es un array válido.');
            setRock([]);
          }
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
            setTotalPieces(response?.order?.totalPieces?.toString() || '1');
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
  useEffect(() => {
    if (!showLong) {
      setShowInitialName(false);
      setShowName(false);
      setShowPieceTotal(false);
    }
  }, [showLong]);

  return (
    <View style={styles.container}>
      {controlerView === 1 && (
        <ViewNewOrder
          totalPieces={totalPieces}
          setStateShow={setStateShow}
          stateShow={stateShow}
          setShowNameNA={setShowNameNA}
          showNameNA={showNameNA}
          orderId={orderId}
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
          dataSend={orderCurrent}
        />
      )}
      {controlerView === 2 && (
        <SumaryOrder
          stateShow={stateShow}
          setObservations={setObservations}
          setTotalPieces={setTotalPieces}
          setCaratage={setCaratage}
          setColor={setColor}
          setRock={setRock}
          setStateGlobalInitial={setStateGlobalInitial}
          setStateGlobalLong={setStateGlobalLong}
          setStateGlobalName={setStateGlobalName}
          setStateGlobalSize={setStateGlobalSize}
          setModel={setModel}
          handleDataUpdate={reloadView}
          setControlerView={setControlerView}
          dataSend={orderCurrent}
          orderId={orderId || ''}
        />
      )}
      {controlerView === 3 && (
        <AppreciationView
          setControlerView={setControlerView}
          reloadView={reloadView}
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
