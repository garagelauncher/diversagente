/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from 'native-base';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { LoadingFallback } from '@src/components/LoadingFallback';
import { getIconProviderByName } from '@src/utils/getIconProvider';

type HeaderProps = {
  avatar?: string | null;
  userInitials: string;
  title: string;
  subtitle: string;
  icon?: string;
  iconProvider?: string;
  gobackComponent?: React.ReactNode;
  isLoading?: boolean;
};

export const SubcategoriesFilterHeader: FunctionComponent<HeaderProps> = ({
  title,
  subtitle,
  userInitials,
  avatar,
  icon,
  iconProvider,
  gobackComponent: GobackComponent,
  isLoading = false,
}) => {
  const avatarUri = String(avatar);

  return (
    <>
      {GobackComponent ? GobackComponent : <Box />}
      <TouchableOpacity onPress={console.log}>
        <Flex width={'24'} alignSelf={'flex-end'} marginTop={12} paddingX={6}>
          <Avatar
            backgroundColor={'orange.500'}
            alignSelf="flex-end"
            size={'md'}
            source={{
              uri: avatarUri,
            }}
          >
            {userInitials}
          </Avatar>
        </Flex>
      </TouchableOpacity>
      <Flex
        paddingTop={0}
        paddingX={4}
        paddingBottom={4}
        backgroundColor="darkBlue.700"
        flexDirection={'row'}
        justifyContent="space-between"
        width={'100%'}
      >
        <LoadingFallback
          isLoading={isLoading}
          fallback={
            <Flex paddingX={4} paddingY={6} flexDir={'column'} w={'100%'}>
              <Skeleton my="4" rounded="md" startColor="blue.500" />
              <Skeleton.Text startColor="blue.500" />
            </Flex>
          }
        >
          <Flex paddingX={4} paddingY={6} flexDir={'column'} w={'100%'}>
            <Flex
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Heading
                paddingRight={4}
                color="white"
                fontSize={'32'}
                letterSpacing={0.85}
              >
                {title}
              </Heading>
              <IconButton
                variant={'ghost'}
                size={'lg'}
                _icon={{
                  as: getIconProviderByName(iconProvider),
                  name: icon ?? 'book-open',
                  color: 'white',
                }}
              />
            </Flex>
            <Flex w={'100%'}>
              <Text color="gray.200" marginTop={3} fontSize={16}>
                {subtitle}
              </Text>
            </Flex>
          </Flex>
        </LoadingFallback>
      </Flex>
    </>
  );
};
