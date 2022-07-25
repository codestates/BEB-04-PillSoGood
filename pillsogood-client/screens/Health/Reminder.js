import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";

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
  Alert } from "react-native";
import DatePicker from "react-native-date-picker";
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

const Reminder = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log(date);

  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  const Btn = styled.TouchableOpacity`
    margin-top: 40px;
    width: 100%;
    padding: 10px 
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
  const Container = styled.View`
  background-color: ${BASE_COLOR}
  flex: 1;
  color: black;
  padding: 0px 20px ;

`;
  return (
    
      <Container>
      <View>
        <Text>등록된 약</Text>
      </View>


      <View>
        <Text>알람 이름</Text>
        <TextInput></TextInput>
      </View>


      <View>
        <Text>메모 작성</Text>
        <TextInput></TextInput>
      </View>


      <View>
      <Button title="약 언제 먹을래요?" onPress={() => setOpen(trurre)} />
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
      </View>

      <Btn>
        <BtnText>마일리지 적립</BtnText>
        </Btn>
        </Container>
  );
};
export default Reminder;
