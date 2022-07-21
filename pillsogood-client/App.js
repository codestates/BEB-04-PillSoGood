import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import SplashScreen from "react-native-splash-screen";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import Root from "./navigators/Root";
import { Alert } from "react-native";
import {
  requestUserPermission,
  NotificationListener,
  GetFCMToken,
} from "./src/utils/Pushnotification";
import { getPermission, getPermissions } from "./src/utils/Permissons";
import { request } from "react-native-permissions";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [openSettingsForNotifications] = useMMKVStorage(
  //   "openSettingsForNotifications",
  //   MMKV,
  //   false
  // );
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      //인증상태감지
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    console.log(auth().currentUser);
  }, []);
  //ForeGround state에서 message 받기
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  //background state에서 알람 처리
  // useEffect(() => {
  //   if (openSettingsForNotifications) {
  //     navigate("NotificationsSettingsScreen");
  //   }
  // }, [openSettingsForNotifications]);
  //quit state에서 처리
  // useEffect(() => {
  //   messaging()
  //     .getDidOpenSettingsForNotification()
  //     .then(async (didOpenSettingsForNotification) => {
  //       if (didOpenSettingsForNotification) {
  //         navigate("NotificationsSettingsScreen");
  //       }
  //     });
  // }, []);
  useEffect(() => {
    GetFCMToken();
    requestUserPermission();
    // NotificationListener();
    SplashScreen.hide();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}
