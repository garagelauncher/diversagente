import { createStackNavigator } from '@react-navigation/stack';

import { CategoriesFilter } from '@src/screens/CategoriesFilter';
import { SubcategoriesList } from '@src/screens/CategoriesFilter/SubcategoriesList';
import { FormCreatePost } from '@src/screens/FormCreatePost';
import { Home } from '@src/screens/Home';

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
      <Screen name="SelectSubcategory" component={SubcategoriesList} />
    </Navigator>
  );
};
