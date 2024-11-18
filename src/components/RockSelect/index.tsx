import React, {FC, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {
  optionsMainRocks,
  optionsPreciousRocks,
  optionsSemiPreciousRocks,
} from '../../utils/optionsSelects';
import {fonts} from '../../theme/fonts';

interface PropsSelect {
  handleOptionPress: (data: string[]) => void;
  optionValue: string[];
}

const RockSelect: FC<PropsSelect> = ({
  handleOptionPress = () => {},
  optionValue = [],
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  console.log('optionValue', optionValue);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Piedra</Text>
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
              <Text style={styles.textTitle}>Piedra</Text>
              <Pressable onPress={() => setIsActiveModal(!isActiveModal)}>
                <Text style={styles.textTitle}>Guardar</Text>
              </Pressable>
            </View>
            <View>
              <FlatList
                data={optionsMainRocks}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <View style={styles.option}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Pressable
                      style={styles.boxSelect}
                      onPress={() => {
                        if (item.value === 'N/A') {
                          handleOptionPress(['N/A']);
                        } else {
                          const isSelected = optionValue.includes(item.value);
                          const newOptions = isSelected
                            ? optionValue.filter(value => value !== item.value)
                            : [
                                ...optionValue.filter(value => value !== 'N/A'),
                                item.value,
                              ];
                          handleOptionPress(newOptions);
                        }
                      }}>
                      {optionValue.includes(item.value) && (
                        <IconImage size={30} source={Icons.general.check} />
                      )}
                    </Pressable>
                  </View>
                )}
              />
              <Text style={styles.subTitle}>Preciosas</Text>
              <FlatList
                data={optionsPreciousRocks}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.optionDown}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Pressable
                      style={styles.boxSelect}
                      onPress={() => {
                        if (item.value === 'N/A') {
                          handleOptionPress(['N/A']);
                        } else {
                          const isSelected = optionValue.includes(item.value);
                          const newOptions = isSelected
                            ? optionValue.filter(value => value !== item.value)
                            : [
                                ...optionValue.filter(value => value !== 'N/A'),
                                item.value,
                              ];
                          handleOptionPress(newOptions);
                        }
                      }}>
                      {optionValue.includes(item.value) && (
                        <IconImage size={30} source={Icons.general.check} />
                      )}
                    </Pressable>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.subTitle}>Semipreciosas</Text>
              <FlatList
                data={optionsSemiPreciousRocks}
                keyExtractor={item => item.value}
                style={styles.contentFlatList}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.optionDown}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Pressable
                      style={styles.boxSelect}
                      onPress={() => {
                        if (item.value === 'N/A') {
                          handleOptionPress(['N/A']);
                        } else {
                          const isSelected = optionValue.includes(item.value);
                          const newOptions = isSelected
                            ? optionValue.filter(value => value !== item.value)
                            : [
                                ...optionValue.filter(value => value !== 'N/A'),
                                item.value,
                              ];
                          handleOptionPress(newOptions);
                        }
                      }}>
                      {optionValue.includes(item.value) && (
                        <IconImage size={30} source={Icons.general.check} />
                      )}
                    </Pressable>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.containerTextDown}>
              <Text style={styles.textDown}>
                *Seleccionar la o las piedras que requiere para el modelo
                elegido.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RockSelect;
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
    padding: Responsive(5),
    marginBottom: Responsive(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Responsive(80),
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Responsive(30),
  },
  boxSelect: {
    borderWidth: 1,
    borderColor: Colors.black,
    width: Responsive(30),
    height: Responsive(30),
  },
  contentFlatList: {maxHeight: 200},
  containerBtnUp: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
});
