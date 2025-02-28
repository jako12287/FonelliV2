import React, {FC, useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {deleteOrder} from '../../api';
import {CustomAlert} from '../../utils/alertError';
import {PropsShow} from '../../types';
import {determineTotalPieces} from '../../utils/determinatePieces';
moment.locale('es');

interface PropsComponenet {
  setControlerView: (data: number) => void;
  setModel: (data: string) => void;
  model: string;
  setCaratage: (data: string) => void;
  caratage: string;
  setColor: (data: string) => void;
  color: string;
  setRock: any;
  rock: any;
  setTotalPieces: (data: string) => void;
  totalPieces: string;
  setObservations: (data: string) => void;
  observations: string;
  setTotalPiecesInSize: (data: number) => void;
  totalPiecesInSize: number;
  setTotalPiecesInLong: (data: number) => void;
  totalPiecesInLong: number;
  stateGlobalLong: any;
  setStateGlobalSize: any;
  stateGlobalSize: any;
  setStateGlobalLong: any;
  setStateGlobalInitial: any;
  stateGlobalInitial: any;
  setShowLong: (data: boolean) => void;
  showLong: boolean;
  setShowInitialName: (data: boolean) => void;
  showInitialName: boolean;
  setShowName: (data: boolean) => void;
  showName: boolean;
  setStateGlobalName: any;
  stateGlobalName: any;
  setTotalPiecesInName: any;
  totalPiecesInName: any;
  setTotalPiecesInInitial: any;
  totalPiecesInInitial: any;
  setShowPieceTotal: any;
  orderId: any;
  setShowNameNA: (data: boolean) => void;
  showNameNA: boolean;
  dataSend: any;
  setStateShow: any;
  stateShow: PropsShow;
  dataEdit: any;
  userNumberCustomer: string;
}
const ViewNewOrder: FC<PropsComponenet> = ({
  setControlerView,
  setModel,
  model,
  setCaratage,
  caratage,
  setColor,
  color,
  setRock,
  rock,
  setTotalPieces,
  totalPieces,
  setObservations,
  observations,
  setTotalPiecesInSize,
  totalPiecesInSize,
  setTotalPiecesInLong,
  totalPiecesInLong,
  stateGlobalSize,
  stateGlobalLong,
  setStateGlobalSize,
  setStateGlobalLong,
  setStateGlobalInitial,
  stateGlobalInitial,
  setShowLong,
  setShowInitialName,
  showInitialName,
  setShowName,
  showName,
  setStateGlobalName,
  stateGlobalName,
  setTotalPiecesInName,
  totalPiecesInName,
  setTotalPiecesInInitial,
  totalPiecesInInitial,
  setShowPieceTotal,
  orderId,
  setShowNameNA,
  showNameNA,
  dataSend,
  setStateShow,
  stateShow,
  dataEdit,
  userNumberCustomer,
}) => {
  const navigation = useCustomNavigation();
  const formattedDate = moment(new Date()).format('DD-MMM-YYYY').toLowerCase();
  const [editableTotalPiece, setEditableTotalPiece] = useState<boolean>(true);
  const handleDelete = () => {
    return Alert.alert(
      'Eliminar Orden',
      '¿Estás seguro de que deseas eliminar la orden?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteOrder(orderId);
              navigation.navigate('Menu');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
            }
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (
      stateShow.size &&
      stateShow.long &&
      stateShow.initialName &&
      stateShow.name
    ) {
      setEditableTotalPiece(true);
    } else {
      setEditableTotalPiece(false);
    }
  }, [stateShow]);

  const handlePrevSubmit = () => {
    if (dataSend.model === '') {
      CustomAlert({
        message1: 'Espera ...',
        message2: 'Debes ingresar el modelo',
      });
      return;
    }

    if (dataSend.caratage === '') {
      CustomAlert({
        message1: 'Espera ...',
        message2: 'Debes elegir el kilataje',
      });
      return;
    }

    if (dataSend.color === '') {
      CustomAlert({
        message1: 'Espera ...',
        message2: 'Debes elegir el color',
      });
      return;
    }
    if (dataSend?.rock === '' || dataSend?.rock?.length === 0) {
      CustomAlert({
        message1: 'Espera ...',
        message2: 'Debes elegir la piedra',
      });
      return;
    }

    if (dataSend.totalPieces === '0' || dataSend.totalPieces === '') {
      CustomAlert({
        message1: 'Espera ...',
        message2: 'Debes ingresar la cantidad de piezas total',
      });
      return;
    }

    setControlerView(2);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerText}>
            <View style={styles.containerLabel}>
              <Text style={styles.labelText}>Fecha</Text>
              <Text style={styles.textTitle}>{formattedDate}</Text>
            </View>
            <View style={styles.containerLabel}>
              <Text style={styles.labelText}>Cliente</Text>
              <Text style={styles.textTitle}>{userNumberCustomer}</Text>
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
            <RockSelect setRock={setRock} rock={rock} />
            {stateShow.size && (
              <SizeSelect
                dataEdit={dataEdit}
                stateShow={stateShow}
                setStateShow={setStateShow}
                setTotalPiecesInSize={setTotalPiecesInSize}
                totalPiecesInSize={totalPiecesInSize}
                stateGlobalSize={stateGlobalSize}
                setStateGlobalSize={setStateGlobalSize}
                setShowLong={setShowLong}
                orderId={orderId}
              />
            )}

            {stateShow.long && (
              <LongSelect
                dataEdit={dataEdit}
                stateShow={stateShow}
                setStateShow={setStateShow}
                showInitialName={showInitialName}
                setTotalPiecesInLong={setTotalPiecesInLong}
                totalPiecesInLong={totalPiecesInLong}
                stateGlobalLong={stateGlobalLong}
                setStateGlobalLong={setStateGlobalLong}
                setShowInitialName={setShowInitialName}
                orderId={orderId}
              />
            )}

            {stateShow.initialName && (
              <InitialNameSelect
                dataEdit={dataEdit}
                stateShow={stateShow}
                setStateShow={setStateShow}
                showName={showName}
                setStateGlobalInitial={setStateGlobalInitial}
                stateGlobalInitial={stateGlobalInitial}
                setShowName={setShowName}
                setTotalPiecesInInitial={setTotalPiecesInInitial}
                totalPiecesInInitial={totalPiecesInInitial}
                orderId={orderId}
              />
            )}

            {stateShow.name && (
              <NameSelect
                dataEdit={dataEdit}
                stateShow={stateShow}
                setStateShow={setStateShow}
                setShowNameNA={setShowNameNA}
                showNameNA={showNameNA}
                setStateGlobalName={setStateGlobalName}
                stateGlobalName={stateGlobalName}
                setTotalPiecesInName={setTotalPiecesInName}
                totalPiecesInName={totalPiecesInName}
                setShowPieceTotal={setShowPieceTotal}
                orderId={orderId}
              />
            )}

            <OnllyItem
              label="Piezas totales"
              onChangeText={e => {
                if (e.length > 1 && e[0] === '0') {
                  e = e.substring(1);
                }
                if (e.length <= 3) {
                  setTotalPieces(e);
                }
              }}
              valueText={determineTotalPieces({
                stateShow,
                totalPieces,
                totalPiecesInInitial,
                totalPiecesInLong,
                totalPiecesInName,
                totalPiecesInSize,
              })}
              editable={editableTotalPiece}
              keyboardTypeCustom="number-pad"
            />
            <OnllyItem
              label="Observaciones"
              onChangeText={setObservations}
              valueText={observations}
              editable={true}
            />
            <View style={styles.containerBtnActions}>
              {orderId && (
                <Pressable onPress={handleDelete}>
                  <IconImage size={60} source={Icons.general.trash} />
                </Pressable>
              )}
              <CustomBotton title="Ver resumen" onClick={handlePrevSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ViewNewOrder;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive(20),
    paddingBottom: Responsive(50),
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
