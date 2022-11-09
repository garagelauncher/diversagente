import {
  NavigationProp,
  useLinkTo,
  useNavigation,
} from '@react-navigation/native';
import {
  Box,
  Flex,
  Text,
  VStack,
  InfoIcon,
  Button,
  Popover,
  FlatList,
  IconButton,
  Spinner,
  Alert,
  HStack,
  Link,
  Skeleton,
  ScrollView,
} from 'native-base';
import React, { useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { Header } from '@src/components/Header';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { useCategories } from '@src/hooks/queries/useCategories';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { theme } from '@src/styles/theme';
import { calculatePreviousDateAccordingToRange } from '@src/utils/calculatePreviousDateAccordingToRange';
import { getIconProviderByName } from '@src/utils/getIconProvider';

enum CategoriesFilterEnum {
  POPULAR = 'POPULARES',
  FAVORITE = 'FAVORITAS',
}

export type CategoriesFilterNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'SelectCategory'
>;

export const CategoriesFilter = () => {
  const { user } = useAuth();

  const [selectedCategoryFilterOption, setSelectedCategoryFilterOption] =
    useState<string>(CategoriesFilterEnum.POPULAR);
  const filterCategoryOptions = [
    {
      id: 1,
      name: CategoriesFilterEnum.POPULAR,
      description:
        'Categorias com maior quantidade de postagens na última semana.',
    },
    {
      id: 2,
      name: CategoriesFilterEnum.FAVORITE,
      description:
        'Categorias que você cadastrou como favoritas no seu perfil.',
    },
  ];

  const emailContentToSuggestNewCategory = {
    subject: 'Sugestão de nova categoria no diversaGente',
    initialDescription:
      'Olá, equipe do diversaGente! Gostaria de sugerir a seguinte categoria: ',
  };

  const navigation = useNavigation<CategoriesFilterNavigationProps>();
  const linkTo = useLinkTo();

  const lastWeekDate = useMemo(() => {
    calculatePreviousDateAccordingToRange(7).toISOString();
  }, []);

  const filterCategory = {
    POPULAR: {
      filter: {
        Post: { every: { createdAt: { gte: lastWeekDate } } },
      },
      sort: ['Post', { _count: 'desc' }],
    },
    FAVORITE: {
      filter: {
        id: user?.lovelyCategoriesIds === undefined || Array.isArray(user?.lovelyCategoriesIds) && user?.lovelyCategoriesIds.length === 0 ? ["bbbbbbbbbbbbbbbbbbbbbbbb"
        ] : user?.lovelyCategoriesIds
      },
      sort: undefined,
    },
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories({
      sort:
        selectedCategoryFilterOption === CategoriesFilterEnum.POPULAR
          ? (filterCategory.POPULAR.sort as
            | [string, object | 'ASC' | 'DESC']
            | undefined)
          : (filterCategory.FAVORITE.sort as
            | [string, object | 'ASC' | 'DESC']
            | undefined),
      filter:
        selectedCategoryFilterOption === CategoriesFilterEnum.POPULAR
          ? {
            ...filterCategory.POPULAR.filter,
          }
          : {
            ...filterCategory.FAVORITE.filter,
          },
    });

  const handleLoadMoreCategories = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleNavigateToSubcategoriesFilter = async (categoryId: string) => {
    navigation.navigate('SelectSubcategory', {
      categoryId,
    });
  };
  const handleNavigationToUserProfile = () => {
    linkTo('/profile');
  };

  const changeCategoryFilterOption = (categoryFilterOption: string) => {
    console.log(categoryFilterOption);
    setSelectedCategoryFilterOption(categoryFilterOption);
  };

  const skeletonsCategories = new Array(5).fill(0);

  return (
    <>
      <Header
        username={String(user?.name)}
        avatar={user?.picture}
        subtitle="Procure por mais categorias de seu interesse"
      />

      <Box
        marginTop={-3}
        width="100%"
        flex={1}
        backgroundColor={'gray.50'}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        paddingX={4}
        paddingTop={8}
      >
        <Flex direction={'row'} width={'100%'} justifyContent="space-between">
          {filterCategoryOptions.map((currentCategoryOption, index) => (
            <Button
              key={index}
              id={currentCategoryOption.id}
              variant={[
                currentCategoryOption.name === selectedCategoryFilterOption
                  ? 'solid'
                  : 'outline',
              ]}
              height={12}
              width={40}
              colorScheme={[
                currentCategoryOption.name === selectedCategoryFilterOption
                  ? 'blue'
                  : 'gray',
              ]}
              onPress={() =>
                changeCategoryFilterOption(currentCategoryOption.name)
              }
              size={'lg'}
            >
              {currentCategoryOption.name}
            </Button>
          ))}
        </Flex>

        <Flex direction="row" marginTop={8}>
          <Text fontSize="2xl" bold>
            Categorias {selectedCategoryFilterOption.toLowerCase()}
          </Text>
          <VStack py="2" alignItems="center">
            <Popover
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps} bgColor={'transparent'} mx={-1}>
                    <InfoIcon color={theme.colors.darkBlue700} />
                  </Button>
                );
              }}
            >
              <Popover.Content
                accessibilityLabel={`Detalhes sobre as categorias ${selectedCategoryFilterOption}`}
                w={56}
              >
                <Popover.Arrow />
                <Popover.Body paddingY={6}>
                  {filterCategoryOptions.map((categoryOption) => {
                    if (categoryOption.name === selectedCategoryFilterOption) {
                      return (
                        <Text key={categoryOption.id} fontSize="sm">
                          {categoryOption.description}
                        </Text>
                      );
                    }
                  })}
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </VStack>
        </Flex>

        <LoadingFallback
          isLoading={isLoading}
          fallback={
            <ScrollView width="100%">
              {skeletonsCategories.map((_, index) => (
                <Skeleton
                  key={index}
                  height={73}
                  borderRadius={8}
                  alignItems={'center'}
                  marginBottom={4}
                  background="blue.500"
                />
              ))}
            </ScrollView>
          }
        >
          <FlatList
            width={'100%'}
            data={data?.pages.map((page) => page.results).flat()}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.6}
                onPress={() => handleNavigateToSubcategoriesFilter(item.id)}
              >
                <Box marginBottom={4}>
                  <Flex
                    h={73}
                    w={'100%'}
                    bg={'blue.50'}
                    borderColor={'darkBlue.600'}
                    borderWidth={1.5}
                    opacity={0.8}
                    rounded="md"
                    justifyContent="space-between"
                    direction="row"
                  >
                    <Text
                      fontSize="xl"
                      justifyContent="center"
                      py={5}
                      px={5}
                      bold
                    >
                      {item.title}
                    </Text>
                    <IconButton
                      colorScheme={'orange'}
                      variant={'ghost'}
                      size={'lg'}
                      _icon={{
                        as: getIconProviderByName(item?.iconProvider),
                        name: item.icon,
                      }}
                    />
                  </Flex>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20 }}
            onEndReached={handleLoadMoreCategories}
            onEndReachedThreshold={0.9}
            ListFooterComponent={
              <LoadingFallback
                fallback={<Spinner color="orange.500" size="lg" />}
                isLoading={isFetchingNextPage}
              >
                <ConditionallyRender
                  condition={
                    selectedCategoryFilterOption ===
                    CategoriesFilterEnum.FAVORITE
                  }
                  trueComponent={
                    <TouchableOpacity activeOpacity={0.8}>
                      <Button
                        bgColor={'blue.500'}
                        height={12}
                        onPress={handleNavigationToUserProfile}
                      >
                        Adicionar outras categorias aos meus favoritos
                      </Button>
                    </TouchableOpacity>
                  }
                  falseComponent={
                    <Alert
                      key="alertInfo"
                      status="info"
                      colorScheme="info"
                      paddingX={2}
                    >
                      <VStack space={2} w="90%">
                        <HStack
                          flexShrink={1}
                          space={2}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text
                              fontSize="md"
                              fontWeight="medium"
                              color="coolGray.800"
                            >
                              Sentindo falta de alguma categoria?
                            </Text>
                          </HStack>
                        </HStack>
                        <Box
                          pl="6"
                          _text={{
                            color: 'coolGray.600',
                          }}
                        >
                          <Link
                            _text={{
                              color: 'info.700',
                              fontWeight: 'bold',
                              fontSize: 'sm',
                            }}
                            onPress={() =>
                              Linking.openURL(
                                `mailto:garagelauncher@gmail.com?subject=${emailContentToSuggestNewCategory.subject}&body=${emailContentToSuggestNewCategory.initialDescription}`,
                              )
                            }
                          >
                            Nos envie um e-mail com a sua sugestão!
                          </Link>
                        </Box>
                      </VStack>
                    </Alert>
                  }
                />
              </LoadingFallback>
            }
            ListEmptyComponent={
              <Flex width="100%" alignItems="center" justifyContent="center">
                <Text color="gray.500">Não há categorias nesse filtro.</Text>
              </Flex>
            }
          />
        </LoadingFallback>
      </Box>
    </>
  );
};
