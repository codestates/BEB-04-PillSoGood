import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Health from "../../screens/Health/Health";

const HealthStack = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>go to two</Text>
  </TouchableOpacity>
);

export default function HealthStackScreen() {
  const HealthStack = createNativeStackNavigator();
  return (
    <HealthStack.Navigator
      screenOptions={({ route }) => ({ headerShown: false })}
    >
      <HealthStack.Screen name="Health" component={Health} />
    </HealthStack.Navigator>
  );
}
