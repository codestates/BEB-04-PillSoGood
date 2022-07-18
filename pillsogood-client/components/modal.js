import React, { useState } from "react";
import { View, Text } from "react-native"
import Modal from "react-native-modal";



function WrapperComponent() {
  return (
    <View>
      <Modal>
        <View style={{ flex: 1 }}>
          <Text>Modal입니다</Text>
        </View>
      </Modal>
    </View>
  );
}