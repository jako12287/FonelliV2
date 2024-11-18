import React, {FC} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Responsive from '../../utils/responsive';
import {Colors} from '../../theme/colors';
import IconImage from '../../utils/iconImage';
import {Icons} from '../../assets/icons';
import {fonts} from '../../theme/fonts';

interface CustomButtonProps {
  title: string;
  color?: string;
  colorBottonBG?: string;
  colorText?: string;
  onClick?: () => void;
  colorShadow?: string;
}

const CustomBotton: FC<CustomButtonProps> = ({
  color = Colors.light_blue_botton,
  colorBottonBG = Colors.dark_blue,
  title = 'Click',
  colorText = Colors.white,
  onClick = () => {},
  colorShadow = Colors.dark_blue,
}) => {
  return (
    <View
      style={styles(color, colorBottonBG, colorText, colorShadow).containerOut}>
      <Pressable
        style={styles(color, colorBottonBG, colorText, colorShadow).container}
        onPress={onClick}>
        <View
          style={
            styles(color, colorBottonBG, colorText, colorShadow).containerText
          }>
          <Text
            style={styles(color, colorBottonBG, colorText, colorShadow).text}>
            {title}
          </Text>
        </View>
        <View
          style={
            styles(color, colorBottonBG, colorText, colorShadow).containerOutBtn
          }>
          <View
            style={
              styles(color, colorBottonBG, colorText, colorShadow)
                .containerBotton
            }>
            <IconImage size={25} source={Icons.general.arrowRight} />
          </View>
        </View>
      </Pressable>
      <View
        style={styles(color, colorBottonBG, colorText, colorShadow).shadow}
      />
    </View>
  );
};

export default CustomBotton;
const styles = (color: string, colorBottonBG: string, colorText: string, colorShadow:string) =>
  StyleSheet.create({
    containerOut: {
      position: 'relative',
    },
    container: {
      backgroundColor: color,
      minHeight: Responsive(70),
      minWidth: Responsive(300),
      maxWidth: Responsive(300),
      borderRadius: Responsive(100),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal:
        Platform.OS === 'android' ? Responsive(10) : Responsive(20),
      zIndex: 2,
    },
    containerText: {
      width: '80%',
      paddingLeft: Responsive(10),
    },
    containerOutBtn: {
      width: '20%',
    },
    shadow: {
      backgroundColor: colorShadow,
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
      fontSize: Responsive(25),
      color: colorText,
      fontFamily: fonts.gotham,
      fontWeight: Platform.OS === 'android' ? '700' : '600',
      flexShrink: 1,
    },
  });
