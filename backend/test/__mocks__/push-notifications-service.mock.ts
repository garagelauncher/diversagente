import { PushNotificationsService } from 'src/shared/services/push-notifications/push-notifications.service';

export const pushNotificationServiceMock = {
  provide: PushNotificationsService,
  useValue: {
    sendPushNotifications: jest.fn(),
  },
};
