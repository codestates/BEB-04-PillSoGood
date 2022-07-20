import React, { useEffect } from "react";
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

export default function App() {
  useEffect(() => {
    GetFCMToken();
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Root />
      </Provider>
    </ApolloProvider>
  );
}
