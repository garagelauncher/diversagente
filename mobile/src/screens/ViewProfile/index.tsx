import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';

import { VisitProfile } from '@src/components/VisitProfile';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

export type ViewProfileScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'ViewProfile'
>;

export const ViewProfile = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'ViewProfile'>>();
  const { username } = route.params;

  return <VisitProfile username={username} />;
};
