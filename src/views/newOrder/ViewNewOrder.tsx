import React, {FC, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import InputControlOff from '../../components/InputControlOff';
import CaratageSelect from '../../components/CaratageSelect';
import ColorSelect from '../../components/ColorSelect';
import RockSelect from '../../components/RockSelect';
import SizeSelect from '../../components/SizeSelect';
import LongSelect from '../../components/LongSelect';
import InitialNameSelect from '../../components/InitialNameSelect';
import NameSelect from '../../components/NameSelect';
import OnllyItem from '../../components/OnlyItem';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import CustomBotton from '../../components/CustomBotton';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import moment from 'moment';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import 'moment/locale/es';
moment.locale('es');

interface PropsComponenet {
  setControlerView: (data: number) => void;
  userEmail: string;
  setModel: (data: string) => void;
  model: string;
  setCaratage: (data: string) => void;
  caratage: string;
  setColor: (data: string) => void;
  color: string;
  setRock: (data: string) => void;
  rock: string;
  setSize: (data: string[]) => void;
  size: string[];
  setLong: (data: string[]) => void;
  long: string[];
  setInitialName: (data: string[]) => void;
  initialName: string[];
  setTotalPieces: (data: string) => void;
  totalPieces: string;
  setName: (data: string[]) => void;
  name: string[];
  setObservations: (data: string) => void;
  observations: string;
}
const ViewNewOrder: FC<PropsComponenet> = ({
  setControlerView,
  userEmail,
  setModel,
  model,
  setCaratage,
  caratage,
  setColor,
  color,
  setRock,
  rock,
  setSize,
  size,
  setLong,
  long,
  setInitialName,
  initialName,
  setTotalPieces,
  totalPieces,
  setName,
  name,
  setObservations,
  observations,
}) => {
  const navigation = useCustomNavigation();
  const formattedDate = moment(new Date()).format('DD-MMM-YYYY').toLowerCase();

  const [showLong, setShowLong] = useState<boolean>(false);
  const [showInitialName, setShowInitialName] = useState<boolean>(false);
  const [showName, setShowName] = useState<boolean>(false);

  // console.log('TCL: [userEmail', userEmail);

  const [estadoTest, setEstadoTest] = useState<any[]>([{count: 0, name: '4'}]);

  const handleDelete = () => {
    return Alert.alert(
      'Eliminar Orden',
      '¿Estás seguro de que deseas eliminar la orden?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          onPress: () => navigation.navigate('Menu'),
          // onPress: async () => {
          //   try {
          //     await dispatch(logout() as never);
          //     // Redirige al usuario a la pantalla de login
          //     navigation.navigate('Courtesy');
          //   } catch (error) {
          //     console.error('Error al cerrar sesión:', error);
          //   }
          // },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <View style={styles.containerLabel}>
          <Text style={styles.labelText}>Fecha</Text>
          <Text style={styles.textTitle}>{formattedDate}</Text>
        </View>
        <View style={styles.containerLabel}>
          <Text style={styles.labelText}>Cliente</Text>
          <Text style={styles.textTitle}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.containerForm}>
        <InputControlOff
          label="Modelo"
          onChangeName={setModel}
          selectValueName={model}
          placeholder=""
        />
        <CaratageSelect
          handleOptionPress={setCaratage}
          optionValue={caratage}
        />
        <ColorSelect handleOptionPress={setColor} optionValue={color} />
        <RockSelect handleOptionPress={setRock} optionValue={rock} />
        <SizeSelect
          estadoTest={estadoTest}
          setEstadoTest={setEstadoTest}
          handleOptionPress={setSize}
          optionValue={size}
          setShowLong={setShowLong}
        />
        {!showLong ? (
          <></>
        ) : (
          <LongSelect
            handleOptionPress={setLong}
            optionValue={long}
            setShowInitialName={setShowInitialName}
          />
        )}
        {!showInitialName && showLong ? (
          <></>
        ) : (
          <InitialNameSelect
            handleOptionPress={setInitialName}
            optionValue={initialName}
            setShowName={setShowName}
          />
        )}
        {!showName ? (
          <></>
        ) : (
          <NameSelect handleOptionPress={setName} optionValue={name} />
        )}
        <OnllyItem
          label="Piezas totales"
          onChangeText={setTotalPieces}
          valueText={totalPieces}
          editable={false}
        />
        <OnllyItem
          label="Observaciones"
          onChangeText={setObservations}
          valueText={observations}
          editable={true}
        />
        <View style={styles.containerBtnActions}>
          <Pressable onPress={handleDelete}>
            <IconImage size={60} source={Icons.general.trash} />
          </Pressable>
          <CustomBotton
            title="Ver resumen"
            onClick={() => {
              setControlerView(2);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewNewOrder;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive(20),
  },
  containerText: {
    gap: Responsive(10),
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Responsive(20),
  },
  labelText: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_bold,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,

    textAlign: 'center',
    color: Colors.black,
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Responsive(15),
    marginTop: Responsive(30),
    paddingHorizontal: Responsive(10),
  },
  containerBtnActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Responsive(20),
    gap: Responsive(15),
    paddingHorizontal: Responsive(30),
    paddingVertical: Responsive(10),
  },
});
