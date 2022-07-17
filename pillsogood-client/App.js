
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import auth from "@react-native-firebase/auth";
import OutNav from "./navigators/OutNav";
import InNav from "./navigators/InNav";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
//app로딩 끝나기 전까지 스플래시 스크린 띄워줌
// import SplashScreen from 'react-native-splash-screen';
import Tabs from "./navigation/Tabs";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
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
    async function prepare() {
      try {
        //앱로딩할 때 렌더링 필요한거(font..)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // setTimeout(() => {
      //          SplashScreen.hideAsync()
      //        }, 2000);
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          {isLoggedIn ? <InNav /> : <OutNav />}
          <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <Tabs />
          </View>
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

