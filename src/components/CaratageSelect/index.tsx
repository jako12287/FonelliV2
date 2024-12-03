import React, {FC, useState} from 'react';
import {
  FlatList,
  Modal,
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
import {optionCaracts} from '../../utils/optionsSelects';

interface PropsSelect {
  handleOptionPress: (data: string) => void;
  optionValue: string;
}

const CaratageSelect: FC<PropsSelect> = ({
  handleOptionPress = () => {},
  optionValue = '',
}) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>Kilataje</Text>
        </View>
        <Pressable
          style={styles.containerInput}
          onPress={() => setIsActiveModal(!isActiveModal)}>
          <View style={styles.input}>
            <Text style={styles.textValue}>
              {optionValue} {optionValue ? 'K' : ''}
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
            <FlatList
              data={optionCaracts}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    handleOptionPress(item.value);
                    setIsActiveModal(false);
                  }}
                  style={styles.option}>
                  <Text style={styles.optionText}>{`${item.label} K`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CaratageSelect;
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
    width: '80%',
    backgroundColor: 'white',
    borderRadius: Responsive(10),
    padding: Responsive(20),
    maxHeight: '50%',
  },
  option: {
    padding: Responsive(10),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: Responsive(16),
    color: '#333',
  },

  textValue: {
    fontSize: Responsive(14),
    color: Colors.black,
  },
});
