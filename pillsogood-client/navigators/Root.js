import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./Tabs/Tabs";
import LoginStackScreen from "./Stack/RegisterStackScreen";
import RegisterStackScreen from "./Stack/RegisterStackScreen";
const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator screenOptions={{ headerShown: false }}>
    <Nav.Screen name="LoginStackScreen" component={LoginStackScreen} />
    <Nav.Screen name="RegisterStackScreen" component={RegisterStackScreen} />
    <Nav.Screen name="Tabs" component={TabNavigation} />
  </Nav.Navigator>
);
export default Root;

// Root {
//     Tabs {
//         Movies => navigate(navigate(Stack, {screen: One}))
//     }
//     Stack{
//         one => navigate(Tabs, {screen:Search})
//     }
// }
