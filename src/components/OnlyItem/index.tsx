import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../theme/colors';
import Responsive from '../../utils/responsive';

interface PropsComponet {
  label: string;
  valueText: string;
  onChangeText: (value: string) => void;
  editable: boolean;
}
const OnllyItem: FC<PropsComponet> = ({
  label,
  onChangeText,
  valueText,
  editable = true,
}) => {
  return (
    <View style={styles.containerTotalPieces}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={valueText}
        onChangeText={value => onChangeText(value)}
        keyboardType={'default'}
        placeholder={''}
        editable={editable}
      />
    </View>
  );
};

export default OnllyItem;
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.black,
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
  containerTotalPieces: {
    flexDirection: 'row',
    width: '108%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Responsive(15),
  },
});
