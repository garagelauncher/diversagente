import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { Forums } from '@src/screens/Forums';
import { Locations } from '@src/screens/Locations';
import { Messages } from '@src/screens/Messages';
import { Profile } from '@src/screens/Profile';
import { theme } from '../../global/styles/theme';


export type RootBottomTabParamList = {
  Locations: undefined;
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
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: theme.colors.orangePrimary,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="Profile"
    >
      <Screen
        name="Forums"
        component={Forums}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'forum'} color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Locations"
        component={Locations}
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
