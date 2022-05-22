import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, HStack, Center, VStack, IconButton } from 'native-base';

type AvatarProps = {
  picture: string;
};

export const UserAvatar = ({ picture }: AvatarProps) => {
  const navigate = useNavigation();

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
        <VStack space={40} alignItems="center" marginTop={10} marginRight={30}>
          <IconButton
            size={'md'}
            variant="solid"
            _icon={{
              as: AntDesign,
              name: 'plus',
            }}
            onPress={() => goToAddCategoryScreen()}
          />
        </VStack>
      </Center>
    </HStack>
  );
};
