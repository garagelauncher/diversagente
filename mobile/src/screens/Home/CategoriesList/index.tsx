import { Button, ScrollView, Skeleton } from 'native-base';
import { FunctionComponent } from 'react';

import { Category } from '@src/contracts/Category';

type CategoriesListProps = {
  categories: Category[];
  isLoaded?: boolean;
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

export const CategoriesList: FunctionComponent<CategoriesListProps> = ({
  categories,
  isLoaded = false,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const skeletonsCategories = new Array(5).fill(0);

  return (
    <ScrollView
      marginTop={6}
      width={'100%'}
      height={20}
      showsHorizontalScrollIndicator
      horizontal
    >
      <Skeleton
        marginLeft={5}
        height={10}
        width={20}
        rounded="sm"
        isLoaded={isLoaded}
      >
        <Button
          variant={selectedCategoryId === null ? 'solid' : 'outline'}
          height={10}
          marginLeft={5}
          onPress={() => onSelectCategory(null)}
          colorScheme={selectedCategoryId === null ? 'blue' : 'gray'}
        >
          Todos
        </Button>
      </Skeleton>

      {!isLoaded &&
        skeletonsCategories.map((_, index) => (
          <Skeleton
            key={index}
            height={10}
            width={20}
            marginLeft={5}
            borderRadius={8}
            marginBottom={4}
          />
        ))}

      {isLoaded &&
        categories.map((category) => (
          <Button
            colorScheme={selectedCategoryId === category.id ? 'blue' : 'gray'}
            fontWeight={600}
            variant={selectedCategoryId === category.id ? 'solid' : 'outline'}
            marginLeft={5}
            height={10}
            key={category.name}
            onPress={() => onSelectCategory(category.id)}
          >
            {category.title}
          </Button>
        ))}

      <Button variant="outline" height={10} marginLeft={5} marginRight={15}>
        Ver mais
      </Button>
    </ScrollView>
  );
};
