import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Heading, ScrollView, Text } from 'native-base';

import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

type ForumScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'Forum'
>;

export const Forum = () => {
  const navigation = useNavigation<ForumScreenNavigationProps>();

  return (
    <Box
      width="100%"
      backgroundColor="yellow.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Forum</Heading>
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
      <Button>Criar categoria</Button>
    </Box>
  );
};
