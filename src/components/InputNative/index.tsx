import React from 'react';
import {useController} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Type} from '../../types';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

interface PropsInput {
  name: string;
  control: any;
  label: string;
  type?: Type;
  secureTextEntry?: boolean;
  errors: any;
  placeholder: string;
  defaultValue?: string | number;
  textarea?: boolean;
}

const CustomInput = ({
  name,
  control,
  label,
  type = Type.DEFAULT,
  secureTextEntry = false,
  errors,
  placeholder = 'default',
  defaultValue = '',
  textarea = false,
}: PropsInput) => {
  const {field} = useController({
    control,
    name,
    rules: {required: true},
    defaultValue,
  });

  console.log('eerrr', errors);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={!textarea ? styles.input : styles.textArea}
            value={field.value}
            onChangeText={field.onChange}
            keyboardType={type}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
          <View style={styles.shadow} />
          {errors && (
            <Text style={styles.textError}>{errors?.[name]?.message}</Text>
          )}
        </View>
      </View>
    </>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Responsive(10),
  },
  containerInput: {
    position: 'relative',
  },
  input: {
    borderWidth: 0.2,
    borderColor: '#000',
    borderRadius: Responsive(0),
    padding: Responsive(12),
    fontSize: Responsive(16),
    backgroundColor: '#FFFFFF',
    width: Responsive(150),
    height: Responsive(40),
    zIndex: 2,
  },
  shadow: {
    position: 'absolute',
    top: Responsive(5),
    left: Responsive(3),
    width: Responsive(150),
    height: Responsive(40),
    backgroundColor: Colors.gray_shadow,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 120,
    textAlignVertical: 'top',
  },
  containerLabel: {
    minWidth: Responsive(150),
    maxWidth: Responsive(170),
    height: Responsive(45),
    borderRadius: Responsive(10),
    backgroundColor: Colors.dark_blue,
    justifyContent: 'center',
    paddingHorizontal: Responsive(10),
    paddingVertical: Responsive(5),
  },
  label: {
    fontSize: Responsive(23),
    fontFamily: fonts.gotham,
    marginBottom: Responsive(5),
    color: Colors.white,
    fontWeight: '900',
  },
  submitButton: {
    backgroundColor: '#1E3A8A',
    padding: Responsive(15),
    borderRadius: Responsive(10),
    alignItems: 'center',
    marginTop: Responsive(20),
    marginBottom: Responsive(20),
  },
  containerError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  textError: {
    color: Colors.error_color,
    fontSize: Responsive(16),
  },
});
