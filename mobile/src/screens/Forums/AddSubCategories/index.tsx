import { UserAvatar } from '@src/components/UserAvatar';
import { Category } from '@src/contracts/Category';
import { diversaGenteServices } from '@src/services/diversaGente';
import { theme } from '@src/styles/theme';
import {
  Box,
  ScrollView,
  Input,
  HStack,
  Button,
  Select,
  CheckIcon,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

export const AddSubCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [service, setService] = React.useState('');

  const fetchAllCategories = useCallback(async () => {
    try {
      const categoriesFromApi = await diversaGenteServices.findAllCategories();
      setCategories(categoriesFromApi);
    } catch (error) {
      console.info('Error while fetching all categories', error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  return (
    <ScrollView backgroundColor={theme.colors.warmGray200}>
      <Box flex={1}>
        <UserAvatar picture={'https://github.com/bertiGrazi.png'} />
      </Box>
      <HStack
        space={4}
        width="100%"
        alignItems="center"
        marginTop={8}
        marginLeft={8}
      >
        <Input
          w={{
            base: '80%',
            md: '25%',
          }}
          placeholder={'Insira o nome da sua subcategoria.'}
          size={'lg'}
          variant="rounded"
        ></Input>
      </HStack>

      <HStack
        space={4}
        width="100%"
        alignItems="center"
        marginTop={8}
        marginLeft={8}
      >
        <Select
          selectedValue={service}
          minWidth="200"
          accessibilityLabel="Selecione uma categoria"
          placeholder="Selecione uma categoria"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          {categories.map((name, index) => {
            return (
              <Select.Item
                label={JSON.stringify(name.title)}
                value={JSON.stringify(name.title)}
                key={index}
              />
            );
          })}
        </Select>
      </HStack>
      <HStack
        space={4}
        width="100%"
        alignItems="center"
        justifyContent={'center'}
        marginTop={20}
      >
        <Button
          width={200}
          // isLoading
          // spinnerPlacement="end"
          // isLoadingText="Submitting"
        >
          Criar Subcategoria
        </Button>
      </HStack>
    </ScrollView>
  );
};
