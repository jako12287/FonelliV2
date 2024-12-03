import React, {FC, useEffect, useState} from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {fonts} from '../../theme/fonts';
import CustomBotton from '../CustomBotton';
import {TextInput} from 'react-native-gesture-handler';
import Count from '../Count';
// import Count from '../Count';

interface PropsSelect {
  handleOptionPress?: (data: string[]) => void;
  optionValue: string[];
}

const NameSelect: FC<PropsSelect> = ({
  optionValue = [],
  handleOptionPress = () => {},
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isNa, setIsNa] = useState<boolean>(false);

  const [name1, setname1] = useState<string>('');
  const [totalPieces, setTotalPieces] = useState<any[]>([]);
  const [labelPieces, setLabelPieces] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSaveData = (data: any) => {
    // Verificar si el nombre ya existe en la lista
    setTotalPieces(prevState => {
      const index = prevState.findIndex(item => item.name === data.name);
      if (index !== -1) {
        // Si ya existe, actualizamos la cantidad
        const updatedList = [...prevState];
        updatedList[index].count = data.count;
        return updatedList;
      } else {
        // Si no existe, agregamos un nuevo elemento
        return [...prevState, data];
      }
    });
  };

  const handleTotalPiece = () => {
    const pieces = totalPieces?.map((el: any) => {
      let total: number = 0;
      if (el.count > 0) {
        total += el.count;
      }
      return total;
    });
    setLabelPieces(
      pieces.reduce((a, b) => {
        return a + b;
      }, 0),
    );
  };

  useEffect(() => {
    handleTotalPiece();
    if (disabled) {
      handleOptionPress(['N/A']);
    } else {
      handleOptionPress(totalPieces);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPieces]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Nombre</Text>
        </View>
        <Pressable
          style={styles.containerInput}
          onPress={() => setIsActiveModal(!isActiveModal)}>
          <View style={styles.input}>
            <Text style={styles.textValue}>
              {optionValue.length > 1
                ? `${optionValue.slice(0, 1).join(', ')} ...`
                : optionValue.join(', ')}
            </Text>
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
              <Text style={styles.textTitle}>Nombre</Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text style={styles.optionText}>{'No Apllica'}</Text>
                <Pressable
                  style={styles.boxSelect}
                  onPress={() => {
                    setIsNa(!isNa);
                    setDisabled(!isNa);
                  }}>
                  {isNa && <IconImage size={30} source={Icons.general.check} />}
                </Pressable>
              </View>
              <View style={styles.containerInputInt}>
                <TextInput
                  style={styles.input}
                  value={name1}
                  onChangeText={value => setname1(value)}
                  keyboardType={'default'}
                  placeholder={''}
                />
                <Count
                  name={'name1'}
                  handleSaveData={handleSaveData}
                  disable={disabled}
                  setDisabled={setDisabled}
                />
              </View>
            </View>
            <View style={styles.containerTextDown}>
              <Text style={styles.textDown}>TOTAL</Text>
              <View style={styles.totalBox}>
                <Text style={styles.textDown}>{labelPieces} piezas</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <CustomBotton
                title="Guardar"
                onClick={() => setIsActiveModal(false)}
              />
            </View>
            <View>
              <Text style={styles.textDown}>
                Escribir Nombre, tal cual quiere que se realice, incluyendo
                Mayúsculas o minúsculas
              </Text>
              <Text style={styles.textDown}>Ejemplo:</Text>
              <Text style={styles.textNameExample}>Alana Pérez</Text>
              <Text style={styles.textCaution}>
                *Máximo 3 palabras x nombre
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default NameSelect;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    justifyContent: 'center',
  },
  containerInput: {
    // marginTop: Responsive(20),
    width: '60%',
    position: 'relative',
    flexDirection: 'row',
    gap: Platform.OS === 'android' ? Responsive(20) : Responsive(28),
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
    color: '#333',
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

  textNameExample: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    textAlign: 'center',
    marginTop: Responsive(10),
  },
  textCaution: {
    fontSize: Responsive(14),
    fontFamily: fonts.poppins_bold,
    color: Colors.error_color,
    textAlign: 'center',
    marginTop: Responsive(20),
    marginBottom: Responsive(10),
    marginLeft: Responsive(10),
    lineHeight: Responsive(25),
  },
  containerInputInt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Responsive(65),
    marginTop: Responsive(20),
  },
});
