import * as Notifications from 'expo-notifications';

export const getPushNotificationToken = async () => {
  console.log('@getPushNotificationToken');
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    console.log('@requestPermissionsAsync');
    await Notifications.requestPermissionsAsync();

    if (!granted) {
      return;
    }
  }

  if (granted) {
    console.log('@getExpoPushTokenAsync');
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log(' pushToken', pushToken);
    console.log('@pushToken');
    return pushToken.data;
  }
};
