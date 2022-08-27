// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { Box, Avatar, Text } from 'native-base';

type HeaderProps = {
  title: string;
  description: string;
};

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <Box
      width="100%"
      height={225}
      backgroundColor={theme.colors.headerColor}
      alignItems="center"
      justifyContent="center"
    >
      <Avatar
        bg="amber.500"
        alignItems={{
          base: 'right',
          md: 'flex-start',
        }}
        marginTop={0}
        marginRight={-250}
      ></Avatar>
      <Text
        fontSize="4xl"
        color={theme.colors.primaryColor}
        marginRight={120}
        bold
        italic
      >
        {title}
      </Text>
      <Text
        fontSize="sm"
        color={theme.colors.secondaryColor}
        paddingRight={20}
        italic
      >
        {description}
      </Text>
    </Box>
  );
};
