import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
import Responsive from '../../utils/responsive';
import {fonts} from '../../theme/fonts';
import {Colors} from '../../theme/colors';
import InputControlOff from '../../components/InputControlOff';
import CaratageSelect from '../../components/CaratageSelect';
import ColorSelect from '../../components/ColorSelect';
import RockSelect from '../../components/RockSelect';
moment.locale('es');

const NewOrder = () => {
  const formattedDate = moment(new Date()).format('DD-MMM-YYYY').toLowerCase();

  const [model, setModel] = useState<string>('');
  const [caratage, setCaratage] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [rock, setRock] = useState<string[]>(['N/A']);
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <View style={styles.containerLabel}>
          <Text style={styles.labelText}>Fecha</Text>
          <Text style={styles.textTitle}>{formattedDate}</Text>
        </View>
        <View style={styles.containerLabel}>
          <Text style={styles.labelText}>Cliente</Text>
          <Text style={styles.textTitle}>556478</Text>
        </View>
      </View>

      <View style={styles.containerForm}>
        <InputControlOff
          label="Modelo"
          onChangeName={setModel}
          selectValueName={model}
          placeholder=""
        />
        <CaratageSelect
          handleOptionPress={setCaratage}
          optionValue={caratage}
        />
        <ColorSelect handleOptionPress={setColor} optionValue={color} />
        <RockSelect handleOptionPress={setRock} optionValue={rock} />
      </View>
    </View>
  );
};

export default NewOrder;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Responsive(20),
  },
  containerText: {
    gap: Responsive(10),
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Responsive(20),
  },
  labelText: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_bold,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: Responsive(16),
    fontFamily: fonts.poppins_medium,

    textAlign: 'center',
    color: Colors.black,
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Responsive(20),
    marginTop: Responsive(30),
    paddingHorizontal: Responsive(10),
  },
});
