import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { isProduction } from '@src/configs';

export const getPushNotificationToken = async () => {
  console.log('@getPushNotificationToken');
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    console.log('@requestPermissionsAsync');
    await Notifications.requestPermissionsAsync();

    if (!granted) {
      alert('Denied push notifications!');
      return;
    }
  }

  if (granted) {
    console.log('@getExpoPushTokenAsync');
    const pushToken = isProduction
      ? await Notifications.getDevicePushTokenAsync()
      : await Notifications.getExpoPushTokenAsync();

    console.log(' pushToken', pushToken);
    console.log('@pushToken');
    return pushToken.data;
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};
