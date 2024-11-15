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
}

const CustomBotton: FC<CustomButtonProps> = ({
  color = Colors.light_blue_botton,
  colorBottonBG = Colors.dark_blue,
  title = 'Click',
  colorText = Colors.white,
  onClick = () => {},
}) => {
  return (
    <View style={styles(color, colorBottonBG, colorText).containerOut}>
      <Pressable
        style={styles(color, colorBottonBG, colorText).container}
        onPress={onClick}>
        <View style={styles(color, colorBottonBG, colorText).containerText}>
          <Text style={styles(color, colorBottonBG, colorText).text}>
            {title}
          </Text>
        </View>
        <View style={styles(color, colorBottonBG, colorText).containerOutBtn}>
          <View style={styles(color, colorBottonBG, colorText).containerBotton}>
            <IconImage size={25} source={Icons.general.arrowRight} />
          </View>
        </View>
      </Pressable>
      <View style={styles(color, colorBottonBG, colorText).shadow} />
    </View>
  );
};

export default CustomBotton;
const styles = (color: string, colorBottonBG: string, colorText: string) =>
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
      fontSize: Responsive(25),
      color: colorText,
      fontFamily: fonts.gotham,
      fontWeight: Platform.OS === 'android' ? '700' : '600',
      flexShrink: 1,
    },
  });
