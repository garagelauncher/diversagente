/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ExpoLocation from 'expo-location';
import {
  Avatar,
  Box,
  Heading,
  VStack,
  Flex,
  SimpleGrid,
  Text,
  Skeleton,
  Spinner,
  Menu,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { AppBar } from '@src/components/AppBar';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { Post, UserHasInteracted } from '@src/components/Post';
import { VisitProfile } from '@src/components/VisitProfile';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { usePosts } from '@src/hooks/queries/usePosts';
import { useAuth } from '@src/hooks/useAuth';
import { StackProfileNavigatorParamList } from '@src/routes/stacks/profileStack.routes';

type ProfileScreenNavigationProps = NavigationProp<
  StackProfileNavigatorParamList,
  'EditProfile'
>;

export const Profile = () => {
  const { user } = useAuth();

  return <VisitProfile username={String(user?.username)} />;
};
