import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Reminders from "../../screens/Reminders";

export default function RemindersStackScreen() {
  const RemindersStack = createNativeStackNavigator();
  return (
    <RemindersStack.Navigator
      screenOptions={({ route }) => ({ headerShown: false })}
    >
      <RemindersStack.Screen name="Health" component={Reminders} />
    </RemindersStack.Navigator>
  );
}
