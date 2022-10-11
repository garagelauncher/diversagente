import { createStackNavigator } from '@react-navigation/stack';

import { FormCreatePost } from '@src/screens/FormCreatePost';
import { CategoriesList } from '@src/screens/Forums/CategoriesList';
import { SubcategoriesList } from '@src/screens/Forums/SubcategoriesList';
import { Home } from '@src/screens/Home';
import { PostDetails } from '@src/screens/PostDetails';

export type StackForumNavigatorParamList = {
  Forum: undefined;
  FormCreatePost: undefined;
  SelectCategory: undefined;
  SelectSubcategory: { categoryId: string };
  PostDetails: { postId: string };
};

const { Navigator, Screen } =
  createStackNavigator<StackForumNavigatorParamList>();

export const StackForumPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Forum"
    >
      <Screen name="Forum" component={Home} />
      <Screen name="PostDetails" component={PostDetails} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
      <Screen name="SelectCategory" component={CategoriesList} />
      <Screen name="SelectSubcategory" component={SubcategoriesList} />
    </Navigator>
  );
};
