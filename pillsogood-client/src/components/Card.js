import React from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { Constants } from "expo-constants";

function Card() {
  return <View style={styles.box} />;
}

export default function Card() {
  return (
    <View style={styles.con}>
      <Text style={styles.text}>약 복용하셨나요?</Text>
      <Button title="확인" onPress={() => Alert.alert("복용하였습니다.")} />
    </View>
  );
}
