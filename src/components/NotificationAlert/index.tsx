import React, {FC, useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fonts} from '../../theme/fonts';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';

interface Props {
  isMessage: {messageTitle: string; messageBody: string; active: boolean};
  setIsMessage: (data: any) => void;
}
const NotificationAlert: FC<Props> = ({
  isMessage = {
    messageTitle: '',
    messageBody: '',
    active: false,
  },
  setIsMessage = () => {},
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setIsMessage({
      messageTitle: '',
      messageBody: '',
      active: false,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>
            {isMessage?.messageTitle || 'Mensaje'}
          </Text>
          <Text style={styles.body}>
            {isMessage?.messageBody || 'Mensaje'}{' '}
          </Text>
          <TouchableOpacity onPress={handleClose} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: '20%',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: Responsive(10),
    padding: Responsive(20),
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.poppins_medium, // Asegúrate de tener la fuente instalada
    fontSize: Responsive(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: Responsive(10),
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: Responsive(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: Responsive(20),
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: Responsive(10),
    paddingHorizontal: Responsive(20),
  },
  buttonText: {
    fontFamily: fonts.poppins_medium,
    fontSize: Responsive(16),
    color: Colors.white,
  },
});

export default NotificationAlert;
