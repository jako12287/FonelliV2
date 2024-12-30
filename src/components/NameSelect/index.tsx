import React, {FC, useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {fonts} from '../../theme/fonts';
import CustomBotton from '../CustomBotton';
import Count from '../Count';
import {PropsShow} from '../../types';

interface PropsSelect {
  setStateGlobalName: any;
  stateGlobalName: any;
  setTotalPiecesInName: any;
  totalPiecesInName: any;
  setShowPieceTotal: any;
  setShowNameNA: (data: boolean) => void;
  showNameNA: boolean;
  setStateShow: any;
  stateShow: PropsShow;
  orderId: string;
  dataEdit: any;
}

const NameSelect: FC<PropsSelect> = ({
  setStateGlobalName,
  stateGlobalName,
  setTotalPiecesInName,
  totalPiecesInName,
  setShowPieceTotal,
  setShowNameNA,
  showNameNA,
  setStateShow,
  // stateShow,
  // orderId,
  dataEdit,
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isNa, setIsNa] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const totalCount: any = stateGlobalName?.reduce((sum: any, item: any) => {
      return item.count > 0 ? sum + item.count : sum;
    }, 0);
    setTotalPiecesInName(totalCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateGlobalName]);
  const onChangeInput = (name: string, text: string) => {
    setStateGlobalName((prev: any) =>
      prev.map((item: any) =>
        item.name === name ? {...item, value: text} : item,
      ),
    );
  };

  const onChangeCounter = (name: string, newCount: number) => {
    setStateGlobalName((prev: any) =>
      prev.map((item: any) =>
        item.name === name ? {...item, count: newCount} : item,
      ),
    );
  };

  const addNewRow = () => {
    setStateGlobalName((prev: any) => [
      ...prev,
      {name: `name${prev.length + 1}`, value: '', count: 0},
    ]);
  };

  const removeRow = (name: string) => {
    setStateGlobalName((prev: any) =>
      prev.filter((item: any) => item.name !== name),
    );
  };

  const handleSave = () => {
    if (!disabled) {
      let hasError = false;

      stateGlobalName.forEach((inputData: any) => {
        if (inputData.count > 0 && !inputData.value) {
          hasError = true;
          Alert.alert('Falta insertar nombre en algún campo');
        }

        if (inputData.count === 0 && inputData.value === '') {
          hasError = true;
          Alert.alert('Debes escribir un nombre');
        }

        if (inputData.value && inputData.count === 0) {
          hasError = true;

          Alert.alert('Selecciona el número de piezas para ese nombre');
        }
      });

      if (!hasError) {
        setIsActiveModal(false);
      }
    } else if (disabled) {
      setIsActiveModal(false);
    }
  };

  useEffect(() => {
    if (dataEdit?.name) {
      setIsNa(false);
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEdit]);

  // useEffect(() => {
  //   if (stateShow.name && orderId) {
  //     setIsNa(false);
  //     setDisabled(false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [orderId]);

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
            <View style={styles.containerTextInput}>
              <Text style={styles.textValue}>
                {disabled ? 'N/A' : 'Seleccionado'}
              </Text>
            </View>
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
            <ScrollView>
              <View>
                <View style={styles.option}>
                  <Text style={styles.optionText}>{'No Aplica'}</Text>
                  <Pressable
                    style={styles.boxSelect}
                    onPress={() => {
                      setIsNa(!isNa);
                      setDisabled(!isNa);
                      setShowPieceTotal(!isNa);
                      setShowNameNA(!showNameNA);
                      if (!isNa) {
                        setStateShow({
                          size: true,
                          long: true,
                          initialName: true,
                          name: true,
                          pieceTotal: true,
                        });
                      } else if (isNa) {
                        setStateShow({
                          size: false,
                          long: false,
                          initialName: false,
                          name: true,
                          pieceTotal: false,
                        });
                      }
                    }}>
                    {isNa && (
                      <IconImage size={30} source={Icons.general.check} />
                    )}
                  </Pressable>
                </View>

                <View
                  style={[
                    styles.containerInputInt,
                    styles.extendContainerInputInt,
                  ]}>
                  {stateGlobalName.map((inputData: any) => (
                    <View style={styles.containerInputInt} key={inputData.name}>
                      <Pressable
                        style={[
                          styles.removeButton,
                          disabled && {backgroundColor: Colors.gray_shadow},
                        ]}
                        onPress={() => removeRow(inputData.name)}>
                        <Text style={styles.removeButtonText}>Eliminar</Text>
                      </Pressable>
                      <TextInput
                        style={[
                          styles.input,
                          disabled && {
                            backgroundColor: Colors.gray_shadow,
                            borderColor: Colors.gray_shadow,
                            color: Colors.white,
                          },
                        ]}
                        value={inputData.value}
                        onChangeText={value =>
                          onChangeInput(inputData.name, value)
                        }
                        keyboardType="default"
                        placeholder="Escribe aquí"
                        editable={!disabled}
                      />
                      <Count
                        key={inputData.name}
                        name={inputData.name}
                        handleSaveData={data =>
                          onChangeCounter(inputData.name, data.count)
                        }
                        disable={disabled}
                        setDisabled={setDisabled}
                        stateGlobal={stateGlobalName}
                      />
                    </View>
                  ))}
                </View>
                <View style={styles.containerBtnAdd}>
                  <Pressable
                    onPress={disabled ? null : addNewRow}
                    style={[
                      styles.addButton,
                      disabled && {backgroundColor: Colors.gray_shadow},
                    ]}>
                    <Text style={styles.addButtonText}>Añadir Campo</Text>
                  </Pressable>
                </View>
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
                    {totalPiecesInName} piezas
                  </Text>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <CustomBotton title="Guardar" onClick={handleSave} />
              </View>

              <View>
                <Text style={styles.textDown}>
                  Escribir Nombre, tal cual quiere que se realice, incluyendo
                  Mayúsculas o minúsculas
                </Text>
                <Text style={styles.textDown}>Ejemplo:</Text>
                <Text style={styles.textNameExample}>Alana Pérez</Text>
                <Text style={styles.textCaution}>
                  * Minimo 3 letras x nombre
                </Text>
              </View>
            </ScrollView>
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
    width: '60%',
    position: 'relative',
    flexDirection: 'row',
    gap: Platform.OS === 'android' ? Responsive(20) : Responsive(28),
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.black,
    paddingHorizontal: Responsive(10),
    fontSize: Responsive(16),
    width: Responsive(200),
    height: Responsive(40),
    marginRight: Responsive(25),
  },
  containerTextInput: {
    height: '100%',
    justifyContent: 'center',
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
    padding: Responsive(12),
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
  optionText: {
    fontSize: Responsive(16),
    color: '#333',
  },
  boxSelect: {
    borderWidth: 1,
    borderColor: Colors.black,
    width: Responsive(30),
    height: Responsive(30),
    marginRight: Responsive(10),
  },
  containerInputInt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Responsive(65),
    marginTop: Responsive(20),
  },
  containerBtnUp: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  btnContainer: {
    marginTop: Responsive(0),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: Responsive(20),
  },
  textDown: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,
    color: Colors.black,
    lineHeight: Responsive(30),
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
  textValue: {
    fontSize: Responsive(14),
    color: Colors.black,
  },
  containerTextDown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive(30),
    gap: Responsive(10),
    marginBottom: Responsive(20),
  },
  textTitle: {
    fontSize: Responsive(24),
    fontFamily: fonts.poppins_bold,
    fontWeight: '900',
    color: Colors.title_color,
  },
  extendContainerInputInt: {
    flexDirection: 'column',
    gap: Responsive(10),
  },
  addButton: {
    backgroundColor: Colors.light_blue_botton,
    padding: Responsive(10),
    borderRadius: Responsive(50),
    alignItems: 'center',
    marginTop: Responsive(10),
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  containerBtnAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Responsive(20),
  },
  removeButton: {
    backgroundColor: Colors.light_blue_botton,
    borderRadius: Responsive(50),
    width: Responsive(70),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Responsive(5),
  },
  removeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  textErrorContainer: {
    position: 'absolute',
    bottom: Responsive(-20),
  },
  textError: {
    fontFamily: fonts.poppins_medium,
    color: Colors.error_color,
    fontSize: Responsive(12),
  },
});
