import React from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../../screens/Home";
import Health from "../../screens/Health";
import Reminder from "../../screens/Reminder";
export const navigationRef = createNavigationContainerRef;

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Health":
              iconName = "menu-outline";
              size = 30;
              break;
            //   case 'SearchStackScreen':
            //     iconName = 'search'
            //     break
            case "Reminder":
              iconName = "person-circle-outline";
              size = 28;
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Health" component={Health} />
      <Tab.Screen name="Reminder" component={Reminder} />
    </Tab.Navigator>
  );
}
