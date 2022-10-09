import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Flex, Icon, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HomeScreenNavigationProps } from '..';

export const CreatePostForm = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  function handleNavigateToFormCreatePost() {
    navigation.navigate('FormCreatePost');
  }

  return (
    <Flex
      marginTop={6}
      direction="row"
      width={'100%'}
      alignContent="center"
      justifyContent="center"
    >
      <Input
        mx="3"
        placeholder="Compartilhe com a comunidade"
        borderRadius={90}
        width={'65%'}
        borderColor={'warmGray.700'}
        InputRightElement={
          <Icon
            as={AntDesign}
            name="search1"
            size={4}
            marginRight={3}
            color={'warmGray.700'}
          />
        }
        onFocus={handleOnPress}
      />
      <TouchableOpacity>
        <Button
          size={'sm'}
          variant={'solid'}
          backgroundColor={'gray.100'}
          width={35}
          height={35}
          marginLeft={2}
          onPress={handleNavigateToFormCreatePost}
        >
          <Icon
            as={AntDesign}
            name="plussquareo"
            size={8}
            color={'warmGray.700'}
          />
        </Button>
      </TouchableOpacity>
    </Flex>
  );
};
