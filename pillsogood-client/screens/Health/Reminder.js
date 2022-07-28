import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import Lottie from "lottie-react-native";

import {
  Button,
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DatePicker from "react-native-date-picker";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var weekName = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "hh":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};
String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".toString(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};
const ReminderContainer = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 30px 20px;
`;
const PillTxtInput = styled.TextInput`
  font-size: 16;
`;
const PillTxt = styled.Text`
  font-size: 16;
`;
const PillBtn = styled.Button``;
const Reminder = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [pillscale, setPillscale] = useState(0);
  const [pillmatadata, setPillmetadata] = useState({
    medicine,
    pillscale,
    date,
  });
  console.log(date);

  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

  const Container = styled.View`
    background-color: ${BASE_COLOR};
    flex: 1;
    color: black;
  `;

  const Btn = styled.TouchableOpacity`
    width: 100%;
    padding: 10px;
    border-width: 1px;
    border-radius: 50px;
    border-color: rgba(255, 255, 255, 0.5);
    justify-content: space-between;
    background-color: #202d35;
  `;
  const BtnText = styled.Text`
    color: white;
    font-size: 14px;
    text-align: center;
  `;
  const HeadTxt = styled.Text`
    color: #76a991;
    font-size: 30px;
    font-weight: bold;
    margin: 30px 10px 0px 20px;
  `;
  const SubTxt = styled.Text`
    color: white;
    font-size: 19px;
    font-weight: bold;
    margin-top: -30px;
    margin-left: 10px;
  `;

  const Whenbtn = styled.Button`
    color: black;
    font-size: 19px;
    font-weight: bold;
  `;
  const Rewardtxt = styled.Text`
    color: black;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  `;
  const Titletxt = styled.Text`
    background-color: ${BASE_COLOR};
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin-top: 30px;
  `;

  const Inner = styled.View`
    background-color: white;
    flex: 1;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    margin-top: 50px;
    padding: 20px;
  `;
  return (
    <ReminderContainer>
      <PillTxt>약 이름을 입력해주세요</PillTxt>
      <PillTxtInput
        placeholder="약 이름"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={medicine}
        returnKeyType="next"
        onChangeText={(text) => setPill(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <PillTxt>하루에 몇번 먹어야 하나요?</PillTxt>
      <PillTxtInput
        placeholder="오늘 먹는 약 횟수"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        value={pillscale}
        returnKeyType="next"
        onChangeText={(text) => setMedicine(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <Button title="약 언제 먹을래요?" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        locale="ko"
        androidVariant="nativeAndroid"
        textColor="black"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(data);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button title="알람 입력" onPress={() => setOpen(true)} />
    </ReminderContainer>
  );
};
export default Reminder;
