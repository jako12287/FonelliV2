import React, {FC, useState, useEffect, useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

interface PropsCount {
  name: string;
  handleSaveData(data: any): void;
  disable?: boolean;
  setDisabled: (data: boolean) => void;
  stateGlobal?: string[];
}

const Count: FC<PropsCount> = ({
  name,
  handleSaveData,
  disable = false,
  setDisabled,
  stateGlobal,
}) => {
  const [initialCount, setInitialCount] = useState<number>(0);
  const prevCountRef = useRef<number>(0); // Referencia para almacenar el valor anterior

  // useEffect para manejar el estado inicial solo si cambia el stateGlobalSize
  useEffect(() => {
    if (stateGlobal) {
      const filterObj: any = stateGlobal.find((el: any) => el.name === name);
      if (
        filterObj &&
        filterObj.count !== undefined &&
        filterObj.count !== initialCount
      ) {
        setInitialCount(filterObj.count);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateGlobal, name]); // Solo depende de stateGlobalSize y name, no de initialCount

  // Maneja los incrementos y decrementos
  const handleCount = (_id: number) => {
    setDisabled(false);
    setInitialCount(prev => {
      if (_id === 2) {
        // Decremento, no permite números negativos
        return prev > 0 ? prev - 1 : prev;
      } else {
        // Incremento, no permite pasar de 12
        return prev < 12 ? prev + 1 : prev;
      }
    });
  };

  // Guardar cambios solo si el contador ha cambiado
  useEffect(() => {
    // Solo guardamos si el valor de initialCount cambia
    if (initialCount !== prevCountRef.current) {
      handleSaveData({name, count: initialCount});
      prevCountRef.current = initialCount; // Actualizamos la referencia al valor actual
    }
  }, [initialCount, name, handleSaveData]);

  return (
    <View style={styles.container}>
      <Pressable onPress={disable ? null : () => handleCount(2)}>
        <Text
          style={[styles.textSimbol, disable && {color: Colors.gray_shadow}]}>
          -
        </Text>
      </Pressable>
      <View
        style={[styles.input, disable && {borderColor: Colors.gray_shadow}]}>
        <Text
          style={[styles.textCount, disable && {color: Colors.gray_shadow}]}>
          {initialCount}
        </Text>
      </View>
      <Pressable onPress={disable ? null : () => handleCount(1)}>
        <Text
          style={[styles.textSimbol, disable && {color: Colors.gray_shadow}]}>
          +
        </Text>
      </Pressable>
    </View>
  );
};

export default Count;

const styles = StyleSheet.create({
  container: {
    width: Responsive(50),
    height: Responsive(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Responsive(5),
  },
  input: {
    width: Responsive(30),
    height: Responsive(30),
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSimbol: {
    fontSize: Responsive(17),
    color: Colors.black,
    fontFamily: fonts.gotham,
    fontWeight: '500',
  },
  textCount: {
    fontSize: Responsive(20),
    color: Colors.black,
    fontFamily: fonts.gotham,
    fontWeight: '500',
  },
});
