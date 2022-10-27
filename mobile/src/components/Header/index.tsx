import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import {
  Avatar,
  Badge,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from 'native-base';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getIconProviderByName } from '@src/utils/getIconProvider';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';

type HeaderProps = {
  username?: string;
  screenName?: string;
  avatar?: string | null;
  subtitle: string;
  badgeName?: string;
  navigationToScreenName?: string;
  navigationParams?: any;
  icon?: string;
  iconProvider?: string;
};

type HeaderNavigationProps = NavigationProp<any>;

export const Header: FunctionComponent<HeaderProps> = ({
  username,
  screenName,
  subtitle,
  avatar,
  badgeName,
  navigationToScreenName,
  navigationParams,
  icon,
  iconProvider,
}) => {
  const userInitials = username ? getUsernameInitials(username) : null;
  const avatarUri = String(avatar);

  const linkTo = useLinkTo();

  const navigation = useNavigation<HeaderNavigationProps>();

  const handleNavigateBack = () => {
    if (navigationToScreenName) {
      return navigation.navigate(navigationToScreenName, navigationParams);
    }

    navigation.goBack();
  };

  const handleNavigationToUserProfile = () => {
    linkTo('/profile');
  };

  return (
    <>
      {screenName && (
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
        paddingTop={[screenName ? 0 : 8]}
        paddingX={4}
        paddingBottom={4}
        backgroundColor="darkBlue.700"
        flexDirection={'row'}
        justifyContent="space-between"
        width={'100%'}
      >
        <Flex paddingX={4} paddingY={6} flexDir={'column'} w={'100%'}>
          <Flex
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {username && <Heading color="white">Olá, {username}</Heading>}
            {screenName && (
              <Heading
                paddingRight={4}
                color="white"
                fontSize={'32'}
                letterSpacing={0.85}
              >
                {screenName}{' '}
                {badgeName && (
                  <Flex justifyContent={'center'}>
                    <Badge height={8} borderRadius={8}>
                      <Text
                        alignItems={'center'}
                        fontSize={16}
                        color={'darkBlue.600'}
                        fontWeight="bold"
                      >
                        {badgeName}
                      </Text>
                    </Badge>
                  </Flex>
                )}
              </Heading>
            )}
            {icon && (
              <IconButton
                variant={'ghost'}
                size={'lg'}
                _icon={{
                  as: getIconProviderByName(iconProvider),
                  name: icon,
                  color: 'white',
                }}
              />
            )}
          </Flex>
          <Flex w={'100%'}>
            <Text color="gray.200" marginTop={3} fontSize={16}>
              {subtitle}
            </Text>
          </Flex>
        </Flex>

        {!screenName && (
          <Flex marginLeft={-16} mt={3}>
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
    </>
  );
};
