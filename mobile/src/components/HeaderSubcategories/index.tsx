// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { Box, Flex, Avatar, Text, AspectRatio } from 'native-base';

type HeaderProps = {
  title: string;
  description: string;
};

export const HeaderSubcategories = ({ title, description }: HeaderProps) => {
  return (
    <Box
      width="100%"
      height={270}
      backgroundColor={theme.colors.darkBlue700}
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="row-reverse">
        {/* <Avatar bg="amber.500"></Avatar> */}
      </Flex>
      <Text
        fontSize="3xl"
        color={theme.colors.primaryColor}
        marginTop={20}
        marginLeft={-250}
        bold
      >
        {title}
      </Text>
      <Text
        fontSize="sm"
        color={theme.colors.warmGray200}
        italic
      >
        {description}
      </Text>
    </Box>
  );
};
