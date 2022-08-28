// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { Box, Flex, Avatar, Text, AspectRatio } from 'native-base';

type HeaderProps = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <Box
      width="100%"
      height={150}
      backgroundColor={theme.colors.headerColor}
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="row-reverse" marginLeft={-250}>
        {/* <Avatar bg="amber.500"></Avatar> */}
      </Flex>
      <Text
        fontSize="4xl"
        color={theme.colors.primaryColor}
        marginTop={0}
        marginRight={120}
        italic
      >
        {title}
      </Text>
      <Text
        fontSize="sm"
        color={theme.colors.secondaryColor}
        italic
        marginRight={10}
      >
        {description}
      </Text>
    </Box>
  );
};
