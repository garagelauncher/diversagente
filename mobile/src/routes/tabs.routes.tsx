import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Forums } from '@src/screens/Forums';
import { CategoriesList } from '@src/screens/Forums/CategoriesList';
import { SubcategoriesList } from '@src/screens/Forums/SubcategoriesList';
import { Messages } from '@src/screens/Messages';
import { Profile } from '@src/screens/Profile';
import React from 'react';
import { Platform } from 'react-native';

import { theme } from '../styles/theme';
import { StackLocationPrivateRoutes } from './locationStack.routes';

export type RootBottomTabParamList = {
  LocationsStack: undefined;
  Forums: undefined;
  Messages: undefined;
  Profile: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<RootBottomTabParamList>();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.darkBlue700,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="Forums"
    >
      <Screen
        name="Forums"
        component={SubcategoriesList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'forum'} color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="LocationsStack"
        component={StackLocationPrivateRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'location-on'} color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'message'} color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'person'} color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
