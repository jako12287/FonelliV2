import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

const Count = () => {
  const [initialCount, setInitialCount] = useState<number>(0);

  const handleCount = (_id: number) => {
    if (_id === 2) {
      if (initialCount > 0) {
        setInitialCount(initialCount - 1);
      }
    } else {
      if (initialCount < 12) {
        setInitialCount(initialCount + 1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleCount(2)}>
        <Text style={styles.textSimbol}>-</Text>
      </Pressable>
      <View style={styles.input}>
        <Text style={styles.textCount}>{initialCount}</Text>
      </View>
      <Pressable onPress={() => handleCount(1)}>
        <Text style={styles.textSimbol}>+</Text>
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
  },
  textCount: {
    fontSize: Responsive(20),
    color: Colors.black,
    fontFamily: fonts.gotham,
  },
});
