import { createStackNavigator } from '@react-navigation/stack';

import { CategoriesFilter } from '@src/screens/CategoriesFilter';
import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Home } from '@src/screens/Home';
import { SubcategoryFilter } from '@src/screens/SubcategoriesFilter';

export type StackHomeNavigatorParamList = {
  FormCreatePost: undefined;
  Home: undefined;
  SelectCategory: undefined;
  SelectSubcategory: { categoryId: string };
};

const { Navigator, Screen } =
  createStackNavigator<StackHomeNavigatorParamList>();

export const StackChatPrivateRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
      <Screen name="SelectCategory" component={CategoriesFilter} />
      <Screen name="SelectSubcategory" component={SubcategoryFilter} />
    </Navigator>
  );
};
