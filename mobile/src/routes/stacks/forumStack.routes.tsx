import { createStackNavigator } from '@react-navigation/stack';

import { CategoriesFilter } from '@src/screens/CategoriesFilter';
import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Home } from '@src/screens/Home';
import { PostDetails } from '@src/screens/PostDetails';
import { SubcategoryFilter } from '@src/screens/SubcategoriesFilter';

export type StackForumNavigatorParamList = {
  Forum: undefined;
  FormCreatePost: undefined;
  SelectCategory: undefined;
  SelectSubcategory: { categoryId: string; categoryTitle: string };
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
      <Screen name="SelectCategory" component={CategoriesFilter} />
      <Screen name="SelectSubcategory" component={SubcategoryFilter} />
    </Navigator>
  );
};
