import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//npm install @react-navigation/native
//npm i @react-navigation/bottom-tabs
import Character from "../screens/Character";
import Home from "../screens/Home";
import Health from "../screens/Health";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: { backgroundColor: "#D8FF98" },
    }}
  >
    1
    <Tab.Screen name="Character" component={Character} />
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Health" component={Health} />
  </Tab.Navigator>;
};

export default Tabs;
