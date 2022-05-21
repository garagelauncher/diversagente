import { Sucess } from '@src/components/Sucess';
import { Box, Heading, Text, View } from 'native-base';

import { theme } from '../../../global/styles/theme';

export const Forums = () => {
  return (
    // <Box
    //   width="100%"
    //   backgroundColor={theme.colors.pastelPrimary}
    //   flex={1}
    //   alignItems="center"
    //   justifyContent="center"
    // >
    //   {/* <Heading>FORUMS PAGE</Heading>
    //   <Text>Work In progress...</Text> */}
    // </Box>
<View style={{flex: 1}}>
<Sucess title={'Ebaaa!'} subtitle={'O cadastro realizado com sucesso!\nAgora é só aproveitar :)'} />
</View>

  );
};
