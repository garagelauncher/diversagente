import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Box,
  Flex,
  Text,
  FlatList,
  Skeleton,
  Spinner,
  Button,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCategories } from '@src/hooks/queries/useCategories';
import { RootBottomTabParamList } from '@src/routes/tabs';

type FavoriteCategoriesNavigationProps = NavigationProp<
  RootBottomTabParamList,
  'ProfileStack'
>;

export const FavoriteCategories = () => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories();
  //TODO: {"id":{"in":["628a98093ce262268e3bfeef"]}} => O ID ENVIADO É O DA CATEGORIA, NÃO DEVERIA SER DO USUÁRIO?

  const skeletonsCategories = new Array(4).fill(0);

  const navigation = useNavigation<FavoriteCategoriesNavigationProps>();

  const handleLoadMorePopularCategories = () => {
    console.log('load more favorite categories');
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNavigationToUserProfile = () => {
    navigation.navigate('ProfileStack');
  };

  return (
    <>
      {(isLoading || isFetchingNextPage) &&
        skeletonsCategories.map((_, index) => (
          <Skeleton
            key={index}
            height={73}
            width={'90%'}
            borderRadius={8}
            alignItems={'center'}
            marginBottom={4}
          ></Skeleton>
        ))}
      <FlatList
        width={'100%'}
        data={data?.pages.map((page) => page.results).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Box marginBottom={4}>
              <Flex
                h={73}
                w={'100%'}
                bg={'blue.50'}
                borderColor={'darkBlue.600'}
                borderWidth={1.5}
                opacity={0.8}
                rounded="md"
                justifyContent="center"
              >
                <Text fontSize="xl" justifyContent="center" py={5} px={5} bold>
                  {item.title}
                </Text>
              </Flex>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        onEndReached={handleLoadMorePopularCategories}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          isFetchingNextPage ? (
            <Spinner color="orange.500" size="sm" />
          ) : (
            <TouchableOpacity activeOpacity={0.8}>
              <Button
                bgColor={'blue.500'}
                height={12}
                onPress={handleNavigationToUserProfile}
              >
                Adicionar outras categorias aos meus favoritos
              </Button>
            </TouchableOpacity>
          )
        }
      />
    </>
  );
};
