import { Feather } from '@expo/vector-icons';
import { Icon, Menu, Text } from 'native-base';
import { FunctionComponent } from 'react';

export type PostActionMenuItemProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

export const PostActionMenuItem: FunctionComponent<PostActionMenuItemProps> = ({
  icon,
  label,
  onPress,
}) => (
  <Menu.Item
    px={4}
    py={2}
    onPress={onPress}
    width="100%"
    _pressed={{ backgroundColor: 'gray.100' }}
    flexDirection="row"
    alignItems="center"
  >
    <Icon as={Feather} name={icon} size={5} mr={2} color="muted.400" />
    <Text marginLeft={2} fontWeight={'bold'}>
      {label}
    </Text>
  </Menu.Item>
);
