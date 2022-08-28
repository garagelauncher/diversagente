/* eslint-disable import/no-unresolved */
import { ButtonCategory } from '@src/components/ButtonCategory/index';
import { Header } from '@src/components/Header/index';
import { theme } from '@src/styles/theme';
import { Box, Flex, Text, VStack, InfoIcon } from 'native-base';

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
      >
        <Box
          width="85%"
          height={70}
          backgroundColor={theme.colors.infoBoxColor}
          borderRadius={4}
          marginTop={0}
        >
          <Flex direction="row">
            <VStack py="3" my={3} mx={3} boxSize="30" alignItems="center">
              <InfoIcon />
            </VStack>
            <Text paddingTop={3} fontSize="sm" paddingLeft={0}>
              Caso tenha uma sugestão de uma nova categoria,
              <Text color={theme.colors.headerColor} bold underline>
                {' '}
                nos enviei um e-mail!
              </Text>
              :)
            </Text>
          </Flex>
        </Box>
        <VStack
          width="100%"
          height={300}
          backgroundColor={theme.colors.primaryColor}
        >
          <Flex
            direction="row"
            marginTop={5}
            justifyItems="space-between"
            marginLeft={10}
          >
            <ButtonCategory title={'Popular'}></ButtonCategory>
            <ButtonCategory title={'Recomendado'}></ButtonCategory>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};
