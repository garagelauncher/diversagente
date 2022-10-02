import { AntDesign } from '@expo/vector-icons';
import { Button, Flex, Icon, Input } from 'native-base';

export const CreatePostForm = () => {
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
      />
      <Button
        size={'sm'}
        variant={'solid'}
        width={35}
        height={35}
        marginLeft={2}
        backgroundColor={'white'}
      >
        <Icon
          as={AntDesign}
          name="plussquareo"
          size={8}
          color={'warmGray.700'}
        />
      </Button>
    </Flex>
  );
};
