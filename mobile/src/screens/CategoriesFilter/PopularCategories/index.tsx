import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Alert,
  Link,
  FlatList,
  Skeleton,
  Spinner,
  IconButton,
} from 'native-base';
import React, { useMemo } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCategories } from '@src/hooks/queries/useCategories';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { calculatePreviousDateAccordingToRange } from '@src/utils/calculatePreviousDateAccordingToRange';
import { getIconProviderByName } from '@src/utils/getIconProvider';

type PopularCategoriesNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'SelectSubcategory'
>;

export const PopularCategories = () => {
  const lastWeekDate = useMemo(() => {
    calculatePreviousDateAccordingToRange(7).toISOString();
    console.log(calculatePreviousDateAccordingToRange(7).toISOString());
  }, []);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories({
      sort: ['Post', { _count: 'desc' }],
      filter: {
        Post: { every: { createdAt: { gte: lastWeekDate } } },
      },
    });

  const navigation = useNavigation<PopularCategoriesNavigationProps>();

  const handleNavigateToSubcategoriesFilter = async ({
    categoryId,
    categoryTitle,
    icon,
    iconProvider,
  }: {
    categoryId: string;
    categoryTitle: string;
    icon?: string;
    iconProvider?: string;
  }) => {
    navigation.navigate('SelectSubcategory', {
      categoryId,
      categoryTitle,
      icon,
      iconProvider,
    });
  };

  const emailContentToSuggestNewCategory = {
    subject: 'Sugestão de nova categoria no diversaGente',
    initialDescription:
      'Olá, equipe do diversaGente! Gostaria de sugerir a seguinte categoria: ',
  };

  const handleLoadMorePopularCategories = () => {
    console.log('load more popular categories');
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const skeletonsCategories = new Array(5).fill(0);
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
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.6}
            onPress={() =>
              handleNavigateToSubcategoriesFilter({
                categoryId: item.id,
                categoryTitle: item.title,
                icon: item.icon,
                iconProvider: item.iconProvider,
              })
            }
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
                <Text fontSize="xl" justifyContent="center" py={5} px={5} bold>
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
        onEndReached={handleLoadMorePopularCategories}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          isFetchingNextPage && !hasNextPage ? (
            <Spinner color="orange.500" size="sm" />
          ) : (
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
          )
        }
      />
    </>
  );
};
