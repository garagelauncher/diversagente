import { useRoute, RouteProp } from '@react-navigation/native';
import { Box, Flex } from 'native-base';
import React from 'react';

import { Header } from '@src/components/Header';
import { useSubcategoryDetails } from '@src/hooks/queries/details/useSubcategoryDetails';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

type HeaderSubcategoryProps = {
  categoryId: string | undefined;
};

export const SubcategoryHeader = ({ categoryId }: HeaderSubcategoryProps) => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'Subcategory'>>();
  const { subcategoryId, categoryTitle } = route.params;
  const { user } = useAuth();

  const { data } = useSubcategoryDetails(subcategoryId as string);

  const navigateBackScreenName = 'SelectSubcategory';
  const navigateBackParams = { categoryId, categoryTitle };

  return (
    <Flex
      flexDir={'column'}
      justifyContent={'space-between'}
      bgColor={'darkBlue.700'}
      pb={4}
    >
      <Box>
        {categoryTitle && (
          <>
            <Header
              avatar={user?.picture}
              screenName={data?.title}
              subtitle={data?.description ?? ''}
              badgeName={categoryTitle}
              navigationToScreenName={navigateBackScreenName}
              navigationParams={navigateBackParams}
            ></Header>
            {/**
            <Flex justifyContent={'flex-end'} paddingX={4} w={'100%'}>
              <Box
                w={'100%'}
                mt={6}
                h={24}
                borderRadius={10}
                bgColor={'rgba(255, 255, 255, 0.3)'}
                padding={4}
              >
                <SimpleGrid ml={3} columns={5} space={4} w={'100%'}>
                  <Flex flexDir={'column'} alignItems={'center'}>
                    <Text
                      opacity={1}
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={18}
                    >
                      1548
                    </Text>
                    <Text
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={14}
                      mt={2}
                    >
                      postagens
                    </Text>
                  </Flex>
                  <Divider
                    bg="white"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <Flex flexDir={'column'} alignItems={'center'}>
                    <Text
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={18}
                      opacity={1}
                      zIndex={1}
                    >
                      125
                    </Text>
                    <Text
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={14}
                      mt={2}
                    >
                      comentários
                    </Text>
                  </Flex>
                  <Divider
                    bg="white"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <Flex flexDir={'column'} alignItems={'center'}>
                    <Text
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={18}
                      opacity={1}
                      zIndex={1}
                    >
                      265
                    </Text>
                    <Text
                      mt={2}
                      color={'white'}
                      fontWeight={'bold'}
                      fontSize={14}
                    >
                      curtidas
                    </Text>
                  </Flex>
                </SimpleGrid>
              </Box>
            </Flex>
            */}
          </>
        )}
      </Box>
    </Flex>
  );
};
