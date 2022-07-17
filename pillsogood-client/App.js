import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import OutNav from "./navigators/OutNav";
import InNav from "./navigators/InNav";
import { Provider } from "react-redux";
import { store } from "./src/store";
import {
  requestUserPermission,
  NotificationListener,
  GetFCMToken,
} from "./src/utils/Pushnotification";

export default function App() {
  useEffect(() => {
    GetFCMToken();
    requestUserPermission();
    NotificationListener();
  }, []);
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

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          {isLoggedIn ? <InNav /> : <OutNav />}
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}
