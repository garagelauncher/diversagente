import { Avatar, HStack } from 'native-base';

type AvatarProps = {
  picture: string;
};

export const UserAvatar = ({ picture }: AvatarProps) => {
  return (
    <HStack backgroundColor={'#FFFF'} height={105} direction="row">
      <Avatar
        size="md"
        source={{
          uri: picture,
        }}
        marginTop={12}
        marginLeft={22}
      ></Avatar>
    </HStack>
  );
};
