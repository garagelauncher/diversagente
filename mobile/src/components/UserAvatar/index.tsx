import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { Avatar, HStack, Center, VStack, IconButton } from 'native-base';
import { useEffect, useState } from 'react';

import { useAuth } from '@src/hooks/useAuth';

export const UserAvatar = () => {
  const [picture, setPicture] = useState<string>();
  const { user, setUser } = useAuth();

  useEffect(() => {
    setPicture(user?.picture ?? '');
  }, [user]);

  function goToAddCategoryScreen() {
    console.log('add subcategories screen');
  }

  return (
    <HStack
      backgroundColor={'#FDA02B'}
      height={105}
      flex={1}
      justifyContent={'space-between'}
    >
      <Avatar
        size="md"
        source={{
          uri: picture,
        }}
        marginTop={12}
        marginLeft={22}
      ></Avatar>
      <Center>
        <VStack space={40} alignItems="center" marginTop={10} marginRight={2}>
          <IconButton
            size={'lg'}
            _icon={{
              as: AntDesign,
              name: 'menuunfold',
              color: '#000000',
            }}
            onPress={() => goToAddCategoryScreen()}
          />
        </VStack>
      </Center>
    </HStack>
  );
};
