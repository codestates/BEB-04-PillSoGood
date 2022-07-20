import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import * as SplashScreen from "expo-splash-screen";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-redux";
import { store } from "./src/store";
import {
  requestUserPermission,
  NotificationListener,
  GetFCMToken,
} from "./src/utils/Pushnotification";
import Root from "./navigators/Root";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
