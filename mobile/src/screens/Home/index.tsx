import { Feather } from '@expo/vector-icons';
import {
  FlatList,
  Flex,
  Heading,
  Box,
  IconButton,
  useToast,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';

import { CategoriesList } from './CategoriesList';
import { CreatePostForm } from './CreatePostForm';
import { Header } from './Header';

import { Post } from '@src/components/Post';
import type { Post as PostData } from '@src/contracts/Post';
import { useCategories } from '@src/hooks/queries/useCategories';
import { useAuth } from '@src/hooks/useAuth';

export const Home = () => {
  const toast = useToast();
  const { user } = useAuth();

  const posts: PostData[] = [];

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
  } = useCategories();
  console.debug('top isErrorCategories', isErrorCategories);
  const isLoadedCategories =
    isSuccessCategories && !isLoadingCategories && !isErrorCategories;

  const [isReadingModeActive, setIsReadingModeActive] = useState(false);

  const toggleReadingMode = useCallback(() => {
    setIsReadingModeActive(
      (previousIsReadingModeActive) => !previousIsReadingModeActive,
    );
  }, []);

  if (isErrorCategories) {
    toast.show({
      title: 'Tente novamente mais tarde',
      description: 'Erro ao carregar categorias ',
      backgroundColor: 'red.500',
      duration: 3000,
      placement: 'top',
    });
  }

  return (
    <Flex flex={1}>
      <Header
        username={String(user?.name)}
        avatar={user?.picture}
        subtitle="Compartilhe experiências no fórum"
      />
      <Flex
        backgroundColor="gray.100"
        width="100%"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        marginTop={-4}
        paddingBottom={40}
      >
        {!isReadingModeActive && (
          <>
            <CreatePostForm />

            <CategoriesList
              categories={categories}
              isLoaded={isLoadedCategories}
            />
          </>
        )}

        <Flex
          width="100%"
          padding={6}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>Últimas postagens</Heading>
          <IconButton
            colorScheme={isReadingModeActive ? 'orange' : 'coolGray'}
            variant={'ghost'}
            size={'lg'}
            _icon={{
              as: Feather,
              name: isReadingModeActive ? 'list' : 'grid',
            }}
            onPress={toggleReadingMode}
          />
        </Flex>

        <FlatList
          width={'100%'}
          data={posts}
          renderItem={({ item }) => (
            <Box marginBottom={4}>
              <Post post={item} isPreview />
            </Box>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 350 }}
          onEndReached={() => console.log('end reached')}
        />
      </Flex>
    </Flex>
  );
};
