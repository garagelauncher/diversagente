import { Expo } from 'expo-server-sdk';

const expo = new Expo({});

type PushNotificationOptions = {
    sound: string;
    body: string;
    data: Record<string, any>;
};

export const sendPushNotifications = async (pushTokenList: [], {
    body,
    sound = 'default',
    data = {}
}: PushNotificationOptions) => {

    const messages = [];
    for (const pushToken of pushTokenList) {
    
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
    
      messages.push({
        to: pushToken,
        sound,
        body,
        data,
      });
    }

    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }
}