import { AntDesign, Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Text,
} from 'native-base';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getUsernameInitials } from '@src/utils/getUsernameInitials';


type HeaderProps = {
  username?: string;
  screenName?: string;
  avatar?: string | null;
  subtitle: string;
  customizedHeader?: ReactNode;
};

type HeaderNavigationProps = NavigationProp<any>;

export const Header: FunctionComponent<HeaderProps> = ({
  username,
  screenName,
  subtitle,
  avatar,
  customizedHeader
}) => {
  const userInitials = username ? getUsernameInitials(username) : null;
  const avatarUri = String(avatar);

  const linkTo = useLinkTo();

  const navigation = useNavigation<HeaderNavigationProps>();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleNavigationToUserProfile = () => {
    linkTo('/profile');
  };



  return (
    <>
      {(screenName && !customizedHeader) && (
        <>
          <IconButton
            onPress={handleNavigateBack}
            _pressed={{ opacity: '0.6' }}
            variant="solid"
            marginTop={18}
            bgColor={'darkBlue.700'}
            icon={
              <Icon
                size={'2xl'}
                color={'white'}
                marginBottom={2}
                as={<Feather name="arrow-left" size={32} />}
              />
            }
            position="absolute"
            top={6}
            ml={4}
            zIndex={1}
          />

          <TouchableOpacity onPress={handleNavigationToUserProfile}>
            <Flex
              width={'24'}
              alignSelf={'flex-end'}
              marginTop={12}
              paddingX={6}
            >
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
        </>
      )}
      <Flex
        paddingTop={[screenName ? 4 : 12]}
        paddingX={4}
        paddingBottom={9}
        backgroundColor="darkBlue.700"
        width="100%"
        direction="row"
        justifyContent="space-between"
      >
        <Flex padding={4}>
          {username && <Heading color="white">Olá, {username}</Heading>}
          {screenName && (
            <Heading color="white" fontSize={'32'} letterSpacing={0.85}>
              {screenName}
            </Heading>
          )}
          <Text color="gray.200" marginTop={3} fontSize={16}>
            {subtitle}
          </Text>
        </Flex>
        {!screenName && (
          <Flex marginLeft={-12}>
            <TouchableOpacity onPress={handleNavigationToUserProfile}>
              <Avatar
                backgroundColor={'orange.500'}
                alignSelf="center"
                source={{
                  uri: avatarUri,
                }}
              >
                {userInitials}
              </Avatar>
            </TouchableOpacity>
          </Flex>
        )}
      </Flex>

      {
        customizedHeader && {customizedHeader}
      }
    </>
  );
};
