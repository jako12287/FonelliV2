import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Type} from '../../types';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';

interface InputProps {
  placeholder: string;
  label: string;
  type?: Type;
  onChangeName: any;
  selectValueName: string;
}

const InputControlOff: FC<InputProps> = ({
  label,
  placeholder,
  type = Type.DEFAULT,
  onChangeName = () => {},
  selectValueName,
}) => {
  const onChangeInput = (text: string) => {
    onChangeName(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerLabel}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={selectValueName}
          onChangeText={value => onChangeInput(value)}
          keyboardType={type}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

export default InputControlOff;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Responsive(15),
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: Responsive(12),
    fontSize: Responsive(16),
    width: Responsive(200),
    height: Responsive(40),
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
  },
});
