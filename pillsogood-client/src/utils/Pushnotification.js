import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

export async function GetFCMToken() {
  let fcmToken = await AsyncStorage.getItem("fcmtoken");
  console.log("fcmToken:old token", fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("fcmToken:new token", fcmToken);
        await AsyncStorage.setItem("fcmtoken", fcmToken);
      }
    } catch (error) {
      console.log("Failed to get FCM token");
    }
  }
}
export const NotificationListener = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log("notification on froground state...", remoteMessage);
  });
};
