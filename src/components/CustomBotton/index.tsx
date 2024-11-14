import React, {FC} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {fonts} from '../../theme/fonts';
import {useCustomNavigation} from '../../hooks/useCustomNavigation';

interface CustomButtonProps {
  title: string;
  color?: string;
  colorBottonBG?: string;
  colorText?: string;
}

const CustomBotton: FC<CustomButtonProps> = ({
  color = Colors.light_blue_botton,
  colorBottonBG = Colors.dark_blue,
  title = 'Click',
  colorText = Colors.white,
}) => {
  const navigation = useCustomNavigation();
  return (
    <View style={{position: 'relative'}}>
      <Pressable
        style={styles(color, colorBottonBG, colorText).container}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles(color, colorBottonBG, colorText).text}>
          {title}
        </Text>
        <View style={styles(color, colorBottonBG, colorText).containerBotton}>
          <IconImage size={25} source={Icons.general.arrowRight} />
        </View>
      </Pressable>
      <View style={styles(color, colorBottonBG, colorText).shadow} />
    </View>
  );
};

export default CustomBotton;
const styles = (color: string, colorBottonBG: string, colorText: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      minHeight: Responsive(70),
      minWidth: Responsive(300),
      borderRadius: Responsive(100),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: Platform.OS === 'android' ? Responsive(10) : 0,
      zIndex: 2,
    },
    shadow: {
      backgroundColor: Colors.dark_blue,
      minHeight: Responsive(70),
      minWidth: Responsive(300),
      borderRadius: Responsive(100),
      position: 'absolute',
      top: Responsive(8),
    },
    containerBotton: {
      width: Responsive(50),
      height: Responsive(50),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Responsive(100),
      marginLeft: Responsive(10),
      backgroundColor: colorBottonBG,
    },
    text: {
      fontSize: Responsive(35),
      color: colorText,
      fontFamily: fonts.gotham,
    },
  });
