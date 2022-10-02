import { Button, ScrollView } from 'native-base';
import { FunctionComponent } from 'react';

type Category = {
  name: string;
};

type CategoriesListProps = {
  categories: Category[];
};

export const CategoriesList: FunctionComponent<CategoriesListProps> = ({
  categories,
}) => {
  return (
    <ScrollView
      marginTop={6}
      width={'100%'}
      height={20}
      showsHorizontalScrollIndicator
      horizontal={true}
    >
      {categories.map((category) => (
        <Button
          colorScheme={'gray'}
          fontWeight={600}
          variant="outline"
          marginLeft={5}
          height={10}
          key={category.name}
        >
          {category.name}
        </Button>
      ))}
      <Button variant="outline" height={10} marginLeft={5} marginRight={15}>
        Ver mais
      </Button>
    </ScrollView>
  );
};
