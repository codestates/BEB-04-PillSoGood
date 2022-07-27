import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modalSlice";
const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150;

const FailModal = (props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.textView}>
          <Text style={[styles.text, { fontSize: 20 }]}>
            검증에 실패하였습니다!
          </Text>
          <Text style={styles.text}>알맞은 약봉투를 찍어주세요!</Text>
          <Text style={styles.text}></Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => {
              dispatch(modalActions.setVerify(false));
            }}
          >
            <Text style={[styles.text, { color: "black" }]}>Ok </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alingItems: "center",
    justifyContent: "center",
  },
  modal: {
    height: HEIGHT_MODAL,
    width: WIDTH - 80,
    paddingTop: 10,
    backgroundColor: "white",
    opacity: 0.7,
    boderRadius: 10,
  },
  textView: {
    flex: 1,
    alingItems: "center",
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
  },
  TouchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
});

export { FailModal };
