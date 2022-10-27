import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome5,
  Fontisto,
  Foundation,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import { Icon } from 'native-base';

const iconProviders = new Map<string, typeof Icon>([
  ['MaterialCommunityIcons', MaterialCommunityIcons],
  ['AntDesign', AntDesign],
  ['Ionicons', Ionicons],
  ['FontAwesome', FontAwesome],
  ['Entypo', Entypo],
  ['EvilIcons', EvilIcons],
  ['Feather', Feather],
  ['FontAwesome5', FontAwesome5],
  ['Fontisto', Fontisto],
  ['Foundation', Foundation],
  ['MaterialIcons', MaterialIcons],
  ['Octicons', Octicons],
  ['SimpleLineIcons', SimpleLineIcons],
  ['Zocial', Zocial],
]);

export const getIconProviderByName = (providerName: string | undefined) => {
  if (!providerName) {
    return iconProviders.get('Feather');
  }

  const IconProvider = iconProviders.get(providerName);

  if (!IconProvider) {
    return iconProviders.get('Feather');
  }

  return IconProvider;
};
