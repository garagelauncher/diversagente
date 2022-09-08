import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Forums } from '@src/screens/Forums';
import React from 'react';
import { Platform } from 'react-native';

import { theme } from '../styles/theme';
import { StackLocationPrivateRoutes } from './locationStack.routes';

import { CategoriesList } from '@src/screens/Forums/CategoriesList';
import { SubcategoriesList } from '@src/screens/Forums/SubcategoriesList';
import { Messages } from '@src/screens/Messages';
import { Profile } from '@src/screens/Profile';

export type RootBottomTabParamList = {
  LocationsStack: undefined;
  ForumStack: undefined;
  ChatStack: undefined;
  ProfileStack: undefined;
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
        name="ForumStack"
        component={StackForumPrivateRoutes}
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
        name="ChatStack"
        component={StackChatPrivateRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'message'} color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="ProfileStack"
        component={StackProfilePrivateRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'person'} color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
