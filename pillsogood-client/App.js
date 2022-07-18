import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";

import client from "./apolloClient";

import { Provider } from "react-redux";
import { store } from "./src/store";
import Root from "./navigators/Root";
import {
  requestUserPermission,
  NotificationListener,
  GetFCMToken,
} from "./src/utils/Pushnotification";

import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";

const Nav = createNativeStackNavigator();
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
export default function App() {
  useEffect(() => {
    GetFCMToken();
    requestUserPermission();
    NotificationListener();
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
