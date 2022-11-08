import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

// import { StackChatPrivateRoutes } from '../stacks/chatStack.routes';
import { StackForumPrivateRoutes } from '../stacks/forumStack.routes';
import { StackLocationPrivateRoutes } from '../stacks/locationStack.routes';
import { StackProfilePrivateRoutes } from '../stacks/profileStack.routes';

import { theme } from '@src/styles/theme';

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
        tabBarHideOnKeyboard: true,
      }}
      initialRouteName="ForumStack"
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
      {/* <Screen
        name="ChatStack"
        component={StackChatPrivateRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name={'message'} color={color} size={size} />
          ),
        }}
      /> */}
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
