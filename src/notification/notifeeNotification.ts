import notifee, {AndroidColor} from '@notifee/react-native';

const displayNotification = async (param: {
  from: {
    userId: string;
    name: string;
  };
  to: {
    conversationId: string;
  };
  message: {
    text: string;
  };
}) => {
  await notifee.deleteChannel('default');

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    sound: 'sound',
    lightColor: AndroidColor.GREEN,
  });

  await notifee.displayNotification({
    title: param.from.name,
    body: param.message.text,
    data: {
      partnerId: param.from.userId,
      name: param.from.name,
      conversationId: param.to.conversationId,
    },
    android: {
      channelId,
      smallIcon: 'ic_notifee_small_icon',
      sound: 'sound',
      lights: [AndroidColor.GREEN, 300, 600],
    },
  });
};

export const notifeeNotification = {displayNotification};
