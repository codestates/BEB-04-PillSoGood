import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Reminder from "../../screens/Health/Reminder";

export default function RemindersStackScreen() {
  const RemindersStack = createNativeStackNavigator();
  return (
    <RemindersStack.Navigator
      screenOptions={({ route }) => ({ headerShown: false })}
    >
      <RemindersStack.Screen name="Health" component={Reminder} />
    </RemindersStack.Navigator>
  );
}
