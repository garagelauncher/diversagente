import { Injectable } from '@nestjs/common';
import { Expo, ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class PushNotificationsService {
  private readonly expo: Expo = new Expo();

  async sendPushNotifications(
    pushTokenList: string[],
    { body, sound = 'default', data = {}, title }: Omit<ExpoPushMessage, 'to'>,
  ) {
    const messages: ExpoPushMessage[] = [];
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
        title,
      });
    }

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];
    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
