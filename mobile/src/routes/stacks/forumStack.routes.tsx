import { createStackNavigator } from '@react-navigation/stack';

import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Forum } from '@src/screens/Forum';
import { CategoriesList } from '@src/screens/Forums/CategoriesList';
import { SubcategoriesList } from '@src/screens/Forums/SubcategoriesList';

export type StackForumNavigatorParamList = {
  Forum: undefined;
  FormCreatePost: undefined;
  SelectCategory: undefined;
  SelectSubcategory: { categoryId: string };
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
      <Screen name="Forum" component={Forum} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
      <Screen name="SelectCategory" component={CategoriesList} />
      <Screen name="SelectSubcategory" component={SubcategoriesList} />
    </Navigator>
  );
};
