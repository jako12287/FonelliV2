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
import {optionColor, optionColorMixed} from '../../utils/optionsSelects';
import {fonts} from '../../theme/fonts';

interface PropsSelect {
  handleOptionPress: (data: string) => void;
  optionValue: string;
}

const ColorSelect: FC<PropsSelect> = ({
  handleOptionPress = () => {},
  optionValue = '',
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  console.log('optionValue', optionValue);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Color</Text>
        </View>
        <Pressable
          style={styles.containerInput}
          onPress={() => setIsActiveModal(!isActiveModal)}>
          <View style={styles.input}>
            <Text style={styles.textValue}>{optionValue}</Text>
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
            <Text style={styles.textTitle}>Color</Text>
            <View>
              <FlatList
                data={optionColor}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <View style={styles.option}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Pressable
                      style={styles.boxSelect}
                      onPress={() => {
                        handleOptionPress(item.value);
                        setIsActiveModal(false);
                      }}>
                      {optionValue === item.value && (
                        <IconImage size={30} source={Icons.general.check} />
                      )}
                    </Pressable>
                  </View>
                )}
              />
              <Text style={styles.subTitle}>Combinado</Text>
              <FlatList
                data={optionColorMixed}
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.optionDown}>
                    <Text style={styles.optionText}>{`${item.label}`}</Text>
                    <Pressable
                      style={styles.boxSelect}
                      onPress={() => {
                        handleOptionPress(item.value);
                        setIsActiveModal(false);
                      }}>
                      {optionValue === item.value && (
                        <IconImage size={30} source={Icons.general.check} />
                      )}
                    </Pressable>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.containerTextDown}>
              <Text style={styles.textDown}>
                *Seleccionar el color o combinación en la que requiere el modelo
                elegido
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ColorSelect;
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
    padding: Responsive(10),
    marginBottom: Responsive(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Responsive(80),
  },
  optionDown: {
    padding: Responsive(10),
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
    lineHeight: Responsive(40),
    marginTop: Responsive(60),
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
});
