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
  HStack,
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
  'Subcategory'
>;

export const Subcategory = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'Subcategory'>>();
  const { subcategoryId } = route.params;
  const { user } = useAuth();

  const skeletonsSubcategories = new Array(5).fill(0);

  const navigation = useNavigation<SubcategoriesNavigationProps>();

  return (
    <>
      <Box bgColor={'darkBlue.700'} height={300} mb={10}>
        <Box marginBottom={4}>
          <Header
            avatar={user?.picture}
            screenName={`${subcategoryId}`}
            subtitle={`Aqui estarão todas as subcategorias que se relacionam com a categoria ${subcategoryId}.\nSe não encontrar o que procura, crie uma nova subcategoria! 😃`}
          ></Header>
        </Box>
      </Box>
    </>
  );
};
