import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

const AskAgain = () => {
  const navigation = useCustomNavigation();
  return (
    <View style={styles.container}>
      <View>
        <IconImage source={Icons.general.home} size={60} />
      </View>
      <View style={styles.containerText}>
        <Pressable onPress={() => navigation.navigate('NewOrder')}>
          <Text style={styles.textGoOrder}>¿Quieres hacer otro pedido?</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.textGoMenu}>Regresa al menú</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AskAgain;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    marginLeft: Responsive(20),
    alignItems: 'center',
    gap: Responsive(10),
  },
  textGoOrder: {
    color: Colors.light_blue,
    fontSize: Responsive(28),
    fontFamily: fonts.poppins_bold,

    fontWeight: '800',
    flexShrink: 1,
    textAlign: 'center',
  },
  textGoMenu: {
    color: Colors.gary_text,
    fontSize: Responsive(28),
    fontFamily: fonts.poppins_medium,
    fontWeight: '400',
    flexShrink: 1,
    textAlign: 'center',
  },
});
