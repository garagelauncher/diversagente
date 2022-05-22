import {
  Box,
  ScrollView,
  Input,
  HStack,
  Button,
  Select,
  CheckIcon,
} from 'native-base';
import React from 'react';

import { UserAvatar } from '@src/components/UserAvatar';
import { theme } from '@src/styles/theme';

export const AddSubCategories = () => {
  const [service, setService] = React.useState('');

  return (
    <ScrollView>
      <Box backgroundColor={theme.colors.lightGray} flex={1}>
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
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
      </HStack>
      <HStack
        space={4}
        width="100%"
        alignItems="center"
        justifyContent={'center'}
        marginTop={20}
      >
        <Button width={200}>Criar Subcategoria</Button>
      </HStack>
    </ScrollView>
  );
};
