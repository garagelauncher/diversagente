import {
  Box,
  Flex,
  Text,
  VStack,
  InfoIcon,
  HStack,
  ScrollView,
  Alert,
  Stack,
  IconButton,
  Link,
  FlatList,
} from 'native-base';
import React from 'react';

import { ButtonCategory } from '@src/components/ButtonCategory/index';
import { Header } from '@src/components/HeaderCategories/index';
import { useCategories } from '@src/hooks/queries/useCategories';
import { theme } from '@src/styles/theme';

export const CategoriesList = () => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories({
      sort: ['Post', { _count: 'desc' }],
    });

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

  return (
    <>
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>

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
        <Stack space={3} w="95%" maxW="600" marginTop={8}>
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
                          }}
                          _web={{
                            mb: -2,
                          }}
                        >
                          nos envie um e-mail!
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
        </Stack>
        <HStack
          width="100%"
          height={60}
          marginTop={4}
          backgroundColor={theme.colors.light50}
        >
          <Flex direction="row" paddingLeft={10}>
            <ButtonCategory></ButtonCategory>
          </Flex>
        </HStack>
        <HStack
          width="100%"
          height={50}
          backgroundColor={theme.colors.light50}
          marginTop={0}
        >
          <Flex direction="row">
            <Text fontSize="xl" paddingLeft={8} paddingTop={2} bold>
              Categorias Populares
            </Text>
            <VStack py="2" my={2} mx={2} boxSize="30" alignItems="center">
              <InfoIcon color={theme.colors.darkBlue700} />
            </VStack>
          </Flex>
        </HStack>

        <FlatList
          width={'100%'}
          data={data?.pages.map((page) => page.results).flat()}
          renderItem={({ item }) => (
            <Box marginBottom={4}>
              <Flex
                h={73}
                w={'100%'}
                bg={'warmGray.200'}
                rounded="md"
                justifyContent="center"
              >
                <Text fontSize="xl" justifyContent="center" py={5} px={5} bold>
                  {item.title}
                </Text>
              </Flex>
            </Box>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          onEndReached={handleLoadMoreCategories}
          onEndReachedThreshold={0.85}
        />
        {/*<Categories></Categories>*/}
      </Box>
    </>
  );
};
