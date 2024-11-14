import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackProps} from '../types';

import CourtesyScreen from '../views/courtesy';
import LoginScreen from '../views/login';
import MenuScreen from '../views/menu';
import NewOrderScreen from '../views/newOrder';
import OrderHistoryScreen from '../views/orderHistory';
import CatalogScreen from '../views/catalog';
import SuccessScreen from '../views/success';

const Stack = createStackNavigator<RootStackProps>();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFFFFF'},
      }}>
      <Stack.Screen name="Splahs" component={CourtesyScreen} />
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
