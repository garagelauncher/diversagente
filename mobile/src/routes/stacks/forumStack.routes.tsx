import { createStackNavigator } from '@react-navigation/stack';

import { ComplaintResources } from '@src/contracts/Complaint';
import { CategoriesFilter } from '@src/screens/CategoriesFilter';
import { Comments } from '@src/screens/Comments';
import { FormCreatePost } from '@src/screens/FormCreatePost';
import { FormCreateSubcategory } from '@src/screens/FormCreateSubcategory';
import { Home } from '@src/screens/Home';
import { Likes } from '@src/screens/Likes';
import { PostDetails } from '@src/screens/PostDetails';
import { SelectComplaint } from '@src/screens/SelectComplaint';
import { SubcategoryFilter } from '@src/screens/SubcategoriesFilter';
import { Subcategory } from '@src/screens/Subcategory';

export type StackForumNavigatorParamList = {
  Forum: undefined;
  FormCreatePost: { categoryId?: string | null; subcategoryId?: string | null };
  SelectCategory: undefined;
  SelectSubcategory: {
    categoryId: string;
  };
  Subcategory: {
    categoryId: string;
    subcategoryId: string;
  };
  PostDetails: { postId: string };
  Comments: { postId: string };
  Likes: { postId: string };
  FormCreateSubcategory: { categoryId?: string; subcategoryId?: string };
  SelectComplaint: { resource: ComplaintResources; resourceId: string };
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
      <Screen name="Comments" component={Comments} />
      <Screen name="Likes" component={Likes} />
      <Screen name="FormCreatePost" component={FormCreatePost} />
      <Screen name="SelectCategory" component={CategoriesFilter} />
      <Screen name="SelectSubcategory" component={SubcategoryFilter} />
      <Screen name="Subcategory" component={Subcategory} />
      <Screen name="FormCreateSubcategory" component={FormCreateSubcategory} />
      <Screen name="SelectComplaint" component={SelectComplaint} />
    </Navigator>
  );
};
