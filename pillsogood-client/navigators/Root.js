import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./Tabs/Tabs";
import HomeStackScreen from "./Stack/HomeStackScreen";
import ReminderStackScreen from "./Stack/HealthStack/ReminderStackScreen";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="LoginStackScreen" component={LoginStackScreen} />
      <Nav.Screen name="RegisterStackScreen" component={RegisterStackScreen} />
      <Nav.Screen name="Tabs" component={TabNavigation}></Nav.Screen>
      <Nav.Group>
        <Nav.Screen name="HomeStackScreen" component={HomeStackScreen} />
        <Nav.Screen
          name="ReminderStackScreen"
          component={ReminderStackScreen}
        />
      </Nav.Group>
    </Nav.Navigator>
  );
};
export default Root;

// Root {
//     Tabs {
//         Movies => navigate(navigate(Stack, {screen: One}))
//     }
//     Stack{
//         one => navigate(Tabs, {screen:Search})
//     }
// }
