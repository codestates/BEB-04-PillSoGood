const displayNotification = async (message) => {
  const channelAnoucement = await notifee.createChannel({
    id: "default",
    name: "PillSoGood",
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: message.data.title,
    body: message.data.body,
    android: {
      channelId: channelAnoucement,
      smallIcon: "ic_launcher", //
    },
  });
};

export default {
  displayNoti: (remoteMessage) => displayNotification(remoteMessage),
};
