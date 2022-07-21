import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { useAppState } from "@react-native-community/hooks";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import {
  requestUserPermission,
  NotificationListener,
  GetFCMToken,
} from "./src/utils/Pushnotification";
import Root from "./navigators/Root";
import { getPermission, getPermissions } from "./src/utils/Permissons";
import { request } from "react-native-permissions";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSettingsForNotifications] = useMMKVStorage(
    "openSettingsForNotifications",
    MMKV,
    false
  );
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
  useEffect(() => {
    if (openSettingsForNotifications) {
      navigate("NotificationsSettingsScreen");
    }
  }, [openSettingsForNotifications]);

  useEffect(() => {
    getPermissions(["notification", "camera", "photo"]);
    GetFCMToken();
    requestUserPermission();
    NotificationListener();
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
