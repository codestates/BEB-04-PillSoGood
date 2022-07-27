import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BASE_COLOR } from "../../../colors";
import Login from "../../../screens/Auth/Login";
import Register from "../../../screens/Auth/Register";
import Home from "../../../screens/Home";
import TabNavigation from "./../../Tabs/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Nav = createNativeStackNavigator();

const RegisterStackScreen = () => {
  const Token = AsyncStorage.getItem("token"); //로컬에 jwt 토큰 저장
  return (
    <Nav.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: BASE_COLOR,
        },
        headerShown: false,
      }}
    >
      {Token == "" ? (
        <>
          <Nav.Screen name="Login" component={Login} />
          <Nav.Screen name="Register" component={Register} />
        </>
      ) : (
        <Nav.Screen name="Tabs" component={TabNavigation} />
      )}
    </Nav.Navigator>
  );
};

export default RegisterStackScreen;
//로그인과 회원가입창 스텍
