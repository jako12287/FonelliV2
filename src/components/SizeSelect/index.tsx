import React, {FC, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {optionSize} from '../../utils/optionsSelects';
import {fonts} from '../../theme/fonts';
import Count from '../Count';
import CustomBotton from '../CustomBotton';

interface PropsSelect {
  handleOptionPress?: (data: string[]) => void;
  optionValue: string[];
  setShowLong: (value: boolean) => void;
  setEstadoTest: any;
  estadoTest: any;
}

const SizeSelect: FC<PropsSelect> = ({
  // handleOptionPress = () => {},
  setShowLong,
  setEstadoTest,
  estadoTest,
  // optionValue = [],
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isNa, setIsNa] = useState<boolean>(false);

  // const [totalPieces, setTotalPieces] = useState<any[]>([]);
  // const [labelPieces, setLabelPieces] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSaveData = (data: any) => {
    setEstadoTest((prev: any) => {
      // Mapeamos sobre el estado anterior y actualizamos el item correspondiente
      const updatedState = prev.map((item: any) =>
        item.name === data.name ? {...item, count: data.count} : item,
      );
      // Si no encontramos un item con el nombre especificado, lo agregamos
      if (!updatedState.some((item: any) => item.name === data.name)) {
        updatedState.push(data);
      }
      return updatedState;
    });
  };

  // const handleSaveData = (data: any) => {
  // console.log('data en la funcion de giuardar', data);
  // setEstadoTest([data]);
  //   // Verificar si el nombre ya existe en la lista
  //   setTotalPieces(prevState => {
  //     const index = prevState.findIndex(item => item.name === data.name);
  //     if (index !== -1) {
  //       // Si ya existe, actualizamos la cantidad
  //       const updatedList = [...prevState];
  //       updatedList[index].count = data.count;
  //       return updatedList;
  //     } else {
  //       // Si no existe, agregamos un nuevo elemento

  //       return [...prevState, data];
  //     }
  //   });
  // };

  // const handleTotalPiece = () => {
  //   const pieces = totalPieces?.map((el: any) => {
  //     let total: number = 0;
  //     if (el.count > 0) {
  //       total += el.count;
  //     }
  //     return total;
  //   });
  //   setLabelPieces(
  //     pieces.reduce((a, b) => {
  //       return a + b;
  //     }, 0),
  //   );
  // };

  // useEffect(() => {
  //   setEstadoTest(totalPieces);

  //   handleTotalPiece();
  //   if (disabled) {
  //     handleOptionPress(['N/A']);
  //   } else {
  //     handleOptionPress(totalPieces);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [totalPieces]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Talla</Text>
        </View>
        <Pressable
          style={styles.containerInput}
          onPress={() => setIsActiveModal(!isActiveModal)}>
          <View style={styles.input}>
            <Text style={styles.textValue}>{disabled ? 'N/A' : ''}</Text>
            <View style={styles.arrowContainer}>
              <IconImage size={15} source={Icons.general.arrowDown} />
            </View>
          </View>
        </Pressable>
      </View>

      <Modal
        visible={isActiveModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsActiveModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.containerBtnUp}>
              <Text style={styles.textTitle}>Talla</Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text style={styles.optionText}>{'No Apllica'}</Text>
                <Pressable
                  style={styles.boxSelect}
                  onPress={() => {
                    setIsNa(!isNa);
                    setDisabled(!isNa);
                    setShowLong(!isNa);
                  }}>
                  {isNa && <IconImage size={30} source={Icons.general.check} />}
                </Pressable>
              </View>
              <FlatList
                data={optionSize}
                keyExtractor={item => item.value}
                style={styles.flatList}
                renderItem={({item}) => (
                  <View style={styles.option}>
                    <Text
                      style={styles.optionText}>{`Talla ${item.label}`}</Text>
                    <Count
                      key={item.label}
                      name={item.label}
                      handleSaveData={handleSaveData}
                      disable={disabled}
                      setDisabled={setDisabled}
                      estadoTest={estadoTest}
                    />
                  </View>
                )}
              />
            </View>
            <View style={styles.containerTextDown}>
              <Text
                style={[
                  styles.textDown,
                  disabled && {color: Colors.gray_shadow},
                ]}>
                TOTAL
              </Text>
              <View
                style={[
                  styles.totalBox,
                  disabled && {borderColor: Colors.gray_shadow},
                ]}>
                <Text
                  style={[
                    styles.textDown,
                    disabled && {color: Colors.gray_shadow},
                  ]}>
                  {/* {labelPieces} piezas */}
                  piezas
                </Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <CustomBotton
                title="Guardar"
                onClick={() => setIsActiveModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SizeSelect;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Responsive(15),
  },
  label: {
    fontSize: Responsive(18),
    marginBottom: 5,
    color: Colors.black,
    fontWeight: '700',
  },
  containerLabel: {
    width: '40%',
  },
  containerInput: {
    width: '60%',
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: Responsive(12),
    fontSize: Responsive(16),
    width: Responsive(200),
    height: Responsive(40),
  },
  arrowContainer: {
    position: 'absolute',
    right: Responsive(8),
    top: Responsive(12),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: Responsive(10),
    padding: Responsive(20),
    height: '100%',
    gap: Responsive(25),

    paddingTop: Platform.OS === 'ios' ? Responsive(50) : Responsive(10),
  },
  option: {
    padding: Responsive(3),
    marginBottom: Responsive(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Responsive(70),
  },
  optionDown: {
    padding: Responsive(5),
    marginLeft: Responsive(20),
    marginBottom: Responsive(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Responsive(40),
  },
  optionText: {
    fontSize: Responsive(16),
    color: Colors.black,
    fontWeight: '500',
  },
  closeButton: {
    padding: Responsive(10),
    alignItems: 'center',
    marginTop: Responsive(10),
    backgroundColor: '#1E3A8A',
    borderRadius: Responsive(5),
  },
  closeButtonText: {
    fontSize: Responsive(16),
    color: '#fff',
  },
  textValue: {
    fontSize: Responsive(14),
    color: Colors.black,
  },
  textTitle: {
    fontSize: Responsive(24),
    fontFamily: fonts.poppins_bold,
    fontWeight: '900',
    color: Colors.title_color,
  },
  subTitle: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    fontWeight: '500',
    color: Colors.black,
    marginTop: Responsive(10),
    marginBottom: Responsive(10),
    marginLeft: Responsive(10),
  },
  textDown: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    lineHeight: Responsive(30),
  },
  containerTextDown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive(30),
    gap: Responsive(10),
  },
  boxSelect: {
    borderWidth: 1,
    borderColor: Colors.black,
    width: Responsive(30),
    height: Responsive(30),
    marginRight: Responsive(10),
  },
  contentFlatList: {maxHeight: 200},
  containerBtnUp: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  flatList: {
    height: Responsive(500),
  },
  totalBox: {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: Colors.black,
    width: Responsive(90),
    height: Responsive(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Responsive(20),
  },
  btnContainer: {
    marginTop: Responsive(0),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: Responsive(20),
  },
});
