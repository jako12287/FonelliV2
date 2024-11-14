import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackProps} from '../types';

import SplahsScreen from '../views/splash';
import CourtesyScreen from '../views/courtesy';
import LoginScreen from '../views/login';
import MenuScreen from '../views/menu';
import NewOrderScreen from '../views/newOrder';
import OrderHistoryScreen from '../views/orderHistory';
import CatalogScreen from '../views/catalog';
import SuccessScreen from '../views/success';
import {Colors} from '../theme/colors';

const Stack = createStackNavigator<RootStackProps>();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: Colors.white},
      }}
      initialRouteName="Splahs">
      <Stack.Screen name="Splahs" component={SplahsScreen} />
      <Stack.Screen name="Courtesy" component={CourtesyScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="NewOrder" component={NewOrderScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Catalog" component={CatalogScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default Router;
