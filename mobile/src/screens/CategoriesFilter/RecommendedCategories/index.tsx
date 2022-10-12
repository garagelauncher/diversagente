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
} from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useCategories } from '@src/hooks/queries/useCategories';

export const RecommendedCategories = () => {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useCategories();
  //TODO: {"id":{"in":["628a98093ce262268e3bfeef"]}} => O ID ENVIADO É O DA CATEGORIA, NÃO DEVERIA SER DO USUÁRIO?

  const skeletonsCategories = new Array(4).fill(0);

  const handleLoadMorePopularCategories = () => {
    console.log('load more recommended categories');
    if (hasNextPage) {
      fetchNextPage();
    }
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
    </>
  );
};
