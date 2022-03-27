import notifee, {AndroidColor} from '@notifee/react-native';

const displayNotification = async (param: {
  from: {
    _id: string;
    name: string;
    avatar: string | null;
  };
  to: {
    partner: {
      _id: string;
    };
    conversationId: string;
  };
  message: {
    _id: string;
    senderId: string;
    receiverId: string;
    type: 'text' | 'image';
    text: string | null;
    image: string | null;
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
    body: `${param.message.text}`,
    android: {
      channelId,
      smallIcon: 'ic_notifee_small_icon',
      sound: 'sound',
      lights: [AndroidColor.GREEN, 300, 600],
    },
  });
};

export const notifeeNotification = {displayNotification};
