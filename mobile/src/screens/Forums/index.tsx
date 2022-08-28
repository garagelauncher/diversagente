/* eslint-disable import/no-unresolved */
import { Header } from '@src/components/Header/index';
import { theme } from '@src/styles/theme';
import { Box } from 'native-base';

export const Forums = () => {
  return (
    <>
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>
      <Box
        width="100%"
        flex={1}
        marginTop={-3}
        backgroundColor={theme.colors.primaryColor}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
      ></Box>
    </>
  );
};
