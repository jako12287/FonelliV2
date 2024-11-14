import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackProps} from '../types';

export const useCustomNavigation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>();
  return navigation;
};
