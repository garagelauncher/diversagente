import { AntDesign } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Box,
  Flex,
  Button,
  FlatList,
  Skeleton,
  Text,
  Spinner,
  Icon,
  Input,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Header } from '@src/components/Header';
import { useSubcategories } from '@src/hooks/queries/useSubcategories';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

type SubcategoriesNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'SelectSubcategory',
  'Subcategory'
>;

export const SubcategoryFilter = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'SelectSubcategory'>>();
  const { categoryId, categoryTitle, icon, iconProvider } = route.params;

  const { user } = useAuth();

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useSubcategories({
      filter: {
        categoriesIds: {
          hasSome: [categoryId],
        },
      },
    });

  const skeletonsSubcategories = new Array(4).fill(0);

  const navigation = useNavigation<SubcategoriesNavigationProps>();

  const handleLoadMoreSubcategories = () => {
    console.log('load more favorite subcategories');
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNavigationToSubcategoryCreation = () => {
    navigation.navigate('FormCreateSubcategory', {
      categoryId,
    });
  };

  const handleNavigateToSubcategory = (subcategoryId: string) => {
    navigation.navigate('Subcategory', {
      subcategoryId,
      categoryTitle,
      categoryId,
    });
  };

  return (
    <>
      <Box bgColor={'darkBlue.700'} height={340} mb={10}>
        <Box marginBottom={4}>
          <Header
            avatar={user?.picture}
            screenName={`${categoryTitle}`}
            subtitle={`Aqui estarão todas as subcategorias que se relacionam com a categoria ${categoryTitle}.\nSe não encontrar o que procura, crie uma nova subcategoria! 😃`}
            icon={icon}
            iconProvider={iconProvider}
          ></Header>
        </Box>
      </Box>

      <Box
        width="100%"
        flex={1}
        marginTop={-12}
        backgroundColor={'gray.50'}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
      >
        <>
          {!isFetchingNextPage && (
            <>
              <Flex
                direction="row"
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
                paddingX={6}
                paddingTop={6}
              >
                <Input
                  mx="3"
                  size="lg"
                  placeholder="Pesquise uma subcategoria"
                  borderRadius={90}
                  width={'80%'}
                  InputRightElement={
                    <TouchableOpacity activeOpacity={0.5}>
                      <Icon
                        as={AntDesign}
                        name="search1"
                        size={4}
                        marginRight={3}
                      />
                    </TouchableOpacity>
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={handleNavigationToSubcategoryCreation}
                >
                  <Icon
                    as={AntDesign}
                    name="plussquareo"
                    size={9}
                    color={'darkBlue.800'}
                  />
                </TouchableOpacity>
              </Flex>
              <FlatList
                width={'100%'}
                data={data?.pages.map((page) => page.results).flat()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.6}
                    onPress={() => handleNavigateToSubcategory(item.id)}
                  >
                    <Box marginBottom={4}>
                      <Flex
                        h={73}
                        w={'100%'}
                        borderRadius={8}
                        bg={'blue.700'}
                        rounded="md"
                        justifyContent="center"
                      >
                        <Text
                          fontSize="xl"
                          justifyContent="center"
                          color={'white'}
                          py={5}
                          px={5}
                          bold
                        >
                          {item.title}
                        </Text>
                      </Flex>
                    </Box>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 20 }}
                onEndReached={handleLoadMoreSubcategories}
                onEndReachedThreshold={0.9}
                ListFooterComponent={
                  isFetchingNextPage && !hasNextPage ? (
                    <Spinner color="orange.500" size="sm" />
                  ) : (
                    <Box marginTop={4}>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Button
                          variant={'outline'}
                          borderColor={'darkBlue.600'}
                          _text={{ color: 'darkBlue.600' }}
                          height={12}
                          onPress={handleNavigationToSubcategoryCreation}
                        >
                          Criar nova subcategoria
                        </Button>
                      </TouchableOpacity>
                    </Box>
                  )
                }
              />
            </>
          )}

          {(isLoading || isFetchingNextPage) &&
            skeletonsSubcategories.map((_, index) => (
              <Skeleton
                key={index}
                height={73}
                width={'90%'}
                borderRadius={8}
                alignItems={'center'}
                mt={4}
              ></Skeleton>
            ))}
        </>
      </Box>
    </>
  );
};
