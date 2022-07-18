import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import InNav from "./InNav";
import OutNav from "./OutNav";

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
const Root = () => (
  <Nav.Navigator screenOptions={{ headerShown: false }}>
    {isLoggedIn ? <InNav /> : <OutNav />}
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);
export default Root;
