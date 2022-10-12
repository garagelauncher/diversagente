import {
  Box,
  Flex,
  Text,
  VStack,
  InfoIcon,
  HStack,
  Alert,
  Stack,
  IconButton,
  Link,
  FlatList,
  Skeleton,
  Button,
  Center,
  CloseIcon,
  Collapse,
  Spinner,
} from 'native-base';
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCategories } from '@src/hooks/queries/useCategories';
import { useAuth } from '@src/hooks/useAuth';
import { Header } from '@src/screens/Home/Header';
import { theme } from '@src/styles/theme';

export const CategoriesList = () => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories({
      sort: ['Post', { _count: 'desc' }],
    });

  const filterCategoryOptions = [
    { id: 1, name: 'POPULAR' },
    { id: 2, name: 'RECOMENDADO' },
  ];

  const skeletonsCategoryFilter = new Array(2).fill(0);
  const skeletonsCategories = new Array(4).fill(0);

  const [selectedCategoryFilterOption, setSelectedCategoryFilterOption] =
    useState<string>(filterCategoryOptions[0].name);

  const { user } = useAuth();

  const statusArray = [
    {
      type: 'warning',
      title: 'Caso tenha uma sugestão de uma nova categoria,',
    },
  ];

  const handleLoadMoreCategories = () => {
    console.log('load more categories');
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const changeCategoryFilterOption = (categoryFilterOption: string) => {
    console.log(categoryFilterOption);
    setSelectedCategoryFilterOption(categoryFilterOption);
  };

  return (
    <>
      {/*}
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>*/}

      <Header
        username={String(user?.name)}
        avatar={user?.picture}
        subtitle="Procure por mais categorias de seu interesse"
      />

      <Box
        width="100%"
        flex={1}
        marginTop={-3}
        backgroundColor={theme.colors.light50}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
      >
        {/*}
        <Stack space={3} w="90%" maxW="600" marginTop={8}>
          {statusArray.map((status) => {
            return (
              <Alert key={status.type} w="100%" status={status.type}>
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    justifyContent="space-between"
                  >
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="4" />
                      <Text fontSize="md" color="coolGray.800">
                        {status.title}
                        <Link
                          href="https://nativebase.io"
                          isExternal
                          _text={{
                            color: 'info.600',
                            bold: true,
                            fontSize: 'md',
                          }}
                        >
                          {'\n'} nos envie um e-mail!
                        </Link>
                      </Text>
                    </HStack>
                    <IconButton
                      variant="unstyled"
                      _focus={{
                        borderWidth: 0,
                      }}
                    />
                  </HStack>
                </VStack>
              </Alert>
            );
          })}
        </Stack>*/}

        <Flex
          paddingY={8}
          direction={'row'}
          width={'90%'}
          justifyContent="space-between"
        >
          {isLoading &&
            skeletonsCategoryFilter.map((_, index) => (
              <Skeleton
                key={index}
                height={10}
                width={40}
                rounded="sm"
              ></Skeleton>
            ))}

          {!isLoading &&
            filterCategoryOptions.map((categoryOption, index) => (
              <Button
                key={index}
                id={categoryOption.id}
                variant={[
                  categoryOption.name === selectedCategoryFilterOption
                    ? 'solid'
                    : 'outline',
                ]}
                height={12}
                width={40}
                colorScheme={[
                  categoryOption.name === selectedCategoryFilterOption
                    ? 'blue'
                    : 'gray',
                ]}
                onPress={() => changeCategoryFilterOption(categoryOption.name)}
                size={'lg'}
              >
                {categoryOption.name}
              </Button>
            ))}
        </Flex>
        <HStack width="100%" height={50} backgroundColor={theme.colors.light50}>
          <Flex direction="row">
            <Text fontSize="2xl" paddingLeft={6} bold>
              Categorias populares
            </Text>
            <VStack py="2" my={2} mx={2} boxSize="30" alignItems="center">
              <InfoIcon color={theme.colors.darkBlue700} />
            </VStack>
          </Flex>
        </HStack>
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
                  <Text
                    fontSize="xl"
                    justifyContent="center"
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
          onEndReached={handleLoadMoreCategories}
          onEndReachedThreshold={0.9}
          ListFooterComponent={
            isFetchingNextPage ? (
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
                    >
                      Nos envie um e-mail com a sua sugestão!
                    </Link>
                  </Box>
                </VStack>
              </Alert>
            )
          }
        />
      </Box>
    </>
  );
};
