import React, {FC} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

interface PropsComponet {
  isComponentForAppreciation?: boolean;
  setControlerView?: (data: number) => void;
  reloadView?: any;
}
const AskAgain: FC<PropsComponet> = ({
  isComponentForAppreciation = false,
  setControlerView = () => {},
  reloadView = () => {},
}) => {
  const navigation = useCustomNavigation();
  return (
    <View style={styles.container}>
      <View>
        <IconImage source={Icons.general.home} size={60} />
      </View>
      <View style={styles.containerText}>
        <Pressable
          onPress={() => {
            if (isComponentForAppreciation) {
              reloadView();
              setControlerView(1);
            } else {
              navigation.navigate('NewOrder');
            }
          }}>
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
    paddingHorizontal:
      Platform.OS === 'android' ? Responsive(5) : Responsive(0),
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
