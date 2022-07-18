import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
//app로딩 끝나기 전까지 스플래시 스크린 띄워줌
// import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

SplashScreen.preventAutoHideAsync();
//리소스 가져오는 동안 스플래시 화면 표시

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        //앱로딩할 때 렌더링 필요한거(font..)
        await new Promise(resolve => setTimeout(resolve, 2000));
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
    //레디가 됐다면
    <NavigationContainer>
      <View style={styles.container}
        onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <Tabs />
      </View>
    </NavigationContainer>
  )
}