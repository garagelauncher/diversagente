import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, Flex, Icon, Input, Pressable, useToast } from 'native-base';
import { FunctionComponent, useCallback, useState } from 'react';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { HomeScreenNavigationProps } from '..';

import { ConditionallyRender } from '@src/components/ConditionallyRender';

export type CreatePostFormProps = {
  onSearch: (search: string) => void;
  onResetSearch?: () => void;
};

export const CreatePostForm: FunctionComponent<CreatePostFormProps> = ({
  onSearch,
  onResetSearch = () => {
    return;
  },
}) => {
  const toast = useToast();
  const [searchPostText, setSearchPostText] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProps>();

  function handleNavigateToFormCreatePost() {
    navigation.navigate('FormCreatePost');
  }

  const handleSearchPost = useCallback(
    (text: string) => {
      Keyboard.dismiss();
      if (text && text.length > 3) {
        const normalizedText = text
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        onSearch(normalizedText);
      } else {
        toast.show({
          description: 'Digite pelo menos 4 caracteres',
          background: 'blue.500',
        });
      }
    },
    [onSearch, toast],
  );

  const handleResetSearch = useCallback(() => {
    setSearchPostText('');
    onSearch('');
    onResetSearch();
    Keyboard.dismiss();
  }, [onResetSearch, onSearch]);

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
        placeholder="Pesquise por uma postagem"
        borderRadius={90}
        width={'65%'}
        borderColor={'warmGray.700'}
        InputLeftElement={
          <ConditionallyRender
            condition={searchPostText.length > 0}
            trueComponent={
              <Pressable
                px="3"
                py="4"
                rounded="md"
                backgroundColor="transparent"
                _pressed={{ backgroundColor: 'gray.100' }}
                onPress={handleResetSearch}
              >
                <Icon
                  as={<AntDesign name="close" />}
                  size="sm"
                  ml="2"
                  color="warmGray.700"
                />
              </Pressable>
            }
            falseComponent={<></>}
          />
        }
        InputRightElement={
          <Pressable
            px="3"
            py="4"
            rounded="md"
            backgroundColor="transparent"
            _pressed={{ backgroundColor: 'gray.100' }}
            onPress={() => handleSearchPost(searchPostText)}
          >
            <Icon
              as={AntDesign}
              name="search1"
              size={4}
              marginRight={3}
              color={'warmGray.700'}
            />
          </Pressable>
        }
        keyboardType="web-search"
        returnKeyType="search"
        onChangeText={setSearchPostText}
        onSubmitEditing={(event) => handleSearchPost(event.nativeEvent.text)}
        clearButtonMode="while-editing"
        value={searchPostText}
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
