import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import Tabs from "./Tabs";
import Stack from "./Stack";
import InNav from "./InNav";
import OutNav from "./OutNav";

const Nav = createNativeStackNavigator();

const Root = () => {
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
    <NavigationContainer>
      <Nav.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Nav.Screen name="InNav" component={InNav} />
        ) : (
          <Nav.Screen name="OutNav" component={OutNav} />
        )}
        <Nav.Screen name="Tabs" component={Tabs} />
        <Nav.Screen name="Stack" component={Stack} />
      </Nav.Navigator>
    </NavigationContainer>
  );
};
export default Root;
