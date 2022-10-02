import { Feather } from '@expo/vector-icons';
import { FlatList, Flex, Heading, Box, IconButton } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

import { CategoriesList } from './CategoriesList';
import { CreatePostForm } from './CreatePostForm';
import { Header } from './Header';

import { Post } from '@src/components/Post';
import { Category } from '@src/contracts/Category';
import { useAuth } from '@src/hooks/useAuth';
import { diversaGenteServices } from '@src/services/diversaGente';
import { posts } from '@src/utils/fakeData';

export const Home = () => {
  const { user } = useAuth();

  const [isReadingModeActive, setIsReadingModeActive] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const toggleReadingMode = useCallback(() => {
    setIsReadingModeActive((prevState) => !prevState);
  }, []);

  const fetchCategories = useCallback(async () => {
    const foundCategories = await diversaGenteServices.findAllCategories();
    setCategories(foundCategories);
  }, [setCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

            <CategoriesList categories={categories} />
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
