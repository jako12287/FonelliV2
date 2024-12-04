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
import {optionIniitalName} from '../../utils/optionsSelects';
import {fonts} from '../../theme/fonts';
import Count from '../Count';
import CustomBotton from '../CustomBotton';

interface PropsSelect {
  setShowName: (value: boolean) => void;
  setStateGlobalInitial: any;
  stateGlobalInitial: any;
  totalPiecesInSize: number;
  showLong: boolean;
}

const InitialNameSelect: FC<PropsSelect> = ({
  setStateGlobalInitial,
  stateGlobalInitial,
  totalPiecesInSize,
  setShowName,
  showLong,
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isNa, setIsNa] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [totalPiecesInLocal, setTotalPiecesInLocal] = useState<any>(0);

  const handleSaveData = (data: any) => {
    setStateGlobalInitial((prev: any) => {
      const updatedState = prev.map((item: any) =>
        item.name === data.name ? {...item, count: data.count} : item,
      );
      if (!updatedState.some((item: any) => item.name === data.name)) {
        updatedState.push(data);
      }

      const totalCount: any = updatedState?.reduce((sum: any, item: any) => {
        return item.count > 0 ? sum + item.count : sum;
      }, 0);
      setTotalPiecesInLocal(totalCount);
      return updatedState;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Inicial</Text>
        </View>
        <Pressable
          style={styles.containerInput}
          onPress={() => setIsActiveModal(!isActiveModal)}>
          <View style={styles.input}>
            <Text style={styles.textValue}>{disabled ? 'N/A' : 'Seleccionado'}</Text>
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
              <Text style={styles.textTitle}>Inicial</Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text style={styles.optionText}>{'No Apllica'}</Text>
                <Pressable
                  style={styles.boxSelect}
                  onPress={() => {
                    setIsNa(!isNa);
                    setDisabled(!isNa);
                    setShowName(!isNa);
                  }}>
                  {isNa && <IconImage size={30} source={Icons.general.check} />}
                </Pressable>
              </View>
              <FlatList
                data={optionIniitalName}
                keyExtractor={item => item.value}
                style={styles.flatList}
                renderItem={({item}) => (
                  <View style={styles.option}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Count
                      key={item.label}
                      name={item.label}
                      handleSaveData={handleSaveData}
                      disable={disabled}
                      setDisabled={setDisabled}
                      stateGlobal={stateGlobalInitial}
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
                    !showLong &&
                      !disabled &&
                      totalPiecesInLocal !== totalPiecesInSize && {
                        color: Colors.error_color,
                      },
                  ]}>
                  {totalPiecesInLocal} piezas
                </Text>
              </View>
              {!showLong &&
                totalPiecesInLocal !== totalPiecesInSize &&
                !disabled && (
                  <View style={styles.textErrorContainer}>
                    <Text style={styles.textError}>
                      Las cantidades deben coincidir por talla{' '}
                      {totalPiecesInSize}
                    </Text>
                  </View>
                )}
            </View>
            <View style={styles.btnContainer}>
              {!showLong &&
              !disabled &&
              totalPiecesInLocal !== totalPiecesInSize ? (
                <CustomBotton
                  title="Guardar"
                  onClick={() => {}}
                  color={Colors.gray_shadow}
                  colorBottonBG={Colors.gary_text}
                  colorShadow={Colors.gary_text}
                />
              ) : (
                <CustomBotton
                  title="Guardar"
                  onClick={() => setIsActiveModal(false)}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default InitialNameSelect;
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
    position: 'relative',
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
