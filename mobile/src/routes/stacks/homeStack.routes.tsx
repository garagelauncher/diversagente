import { createStackNavigator } from '@react-navigation/stack';

import { FormCreatePost } from '@src/screens/FormCreatePost';
import { CategoriesList } from '@src/screens/Forums/CategoriesList';
import { SubcategoriesList } from '@src/screens/Forums/SubcategoriesList';
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
      <Screen name="SelectCategory" component={CategoriesList} />
      <Screen name="SelectSubcategory" component={SubcategoriesList} />
    </Navigator>
  );
};
