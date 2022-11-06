import { AntDesign, Feather } from '@expo/vector-icons';
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
  IconButton,
  ScrollView,
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { SubcategoriesFilterHeader } from './SubcategoriesFilterHeader';

import { LoadingFallback } from '@src/components/LoadingFallback';
import { useCategoryDetails } from '@src/hooks/queries/details/useCategoryDetails';
import { useSubcategories } from '@src/hooks/queries/useSubcategories';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';

type SubcategoriesNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'SelectSubcategory',
  'Subcategory'
>;

export const SubcategoryFilter = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'SelectSubcategory'>>();
  const { categoryId } = route.params;

  const { user } = useAuth();

  const { data: category, isLoading: isLoadingCategory } =
    useCategoryDetails(categoryId);
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingSubcategories,
    isFetchingNextPage,
  } = useSubcategories({
    filter: {
      categoriesIds: {
        hasSome: [categoryId],
      },
    },
  });

  const isLoading = isLoadingSubcategories || isLoadingCategory;

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
      categoryId,
    });
  };

  const handleNavigateToSelectCategory = () => {
    navigation.navigate('SelectCategory');
  };

  return (
    <>
      <Box bgColor={'darkBlue.700'} height={340} mb={10}>
        <Box marginBottom={4}>
          <SubcategoriesFilterHeader
            userInitials={getUsernameInitials(String(user?.name))}
            avatar={user?.picture}
            title={category?.title ?? ''}
            subtitle={`Aqui estarão todas as subcategorias que se relacionam com a categoria ${category?.title}.\nSe não encontrar o que procura, crie uma nova subcategoria! 😃`}
            icon={category?.icon}
            iconProvider={category?.iconProvider}
            gobackComponent={
              <IconButton
                onPress={handleNavigateToSelectCategory}
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
            }
          />
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
        padding={4}
      >
        <Flex
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          width={'100%'}
        >
          <Input
            mx="3"
            size="lg"
            placeholder="Pesquise uma subcategoria"
            borderRadius={90}
            width={'80%'}
            InputRightElement={
              <TouchableOpacity activeOpacity={0.5}>
                <Icon as={AntDesign} name="search1" size={4} marginRight={2} />
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

        <LoadingFallback
          isLoading={isLoading}
          fallback={
            <ScrollView width="100%" marginTop={2}>
              {skeletonsSubcategories.map((_, index) => (
                <Skeleton
                  key={index}
                  height={73}
                  borderRadius={8}
                  alignItems={'center'}
                  marginBottom={4}
                  background="darkBlue.500"
                />
              ))}
            </ScrollView>
          }
        >
          <FlatList
            marginTop={2}
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
            contentContainerStyle={{ padding: 4 }}
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
        </LoadingFallback>
      </Box>
    </>
  );
};
