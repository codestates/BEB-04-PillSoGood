import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import DatePicker from "react-native-date-picker";
import ImagePickerComponent from "../../src/utils/ImagePickerComponent";
import callGoogleVisionAsync from "../../src/utils/helperFunctions";
const moment = require("moment");
import { useSelector } from "react-redux";
import { MEDICINE_ALARM } from "./../../src/query/MutationQuery";
import { useMutation } from "@apollo/client";
import { Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ReminderContainer = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 0px 20px;
`;
const HeadTxt = styled.Text`
  color: #202d35;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px 0px 20px;
`;
const HeadWapper = styled.View`
  flex: 0.1;
  background-color: #ffffff7f;
  border-radius: 20px;
  padding: 20px;
  width: ${SCREEN_WIDTH * 0.7};
  padding-top: -10px;
  margin-top: 5px;
  margin-bottom: -10px;
  align-items: center;
`;

const SubTxt = styled.Text`
  color: #202d35;
  font-size: 15px;
  font-weight: bold;
  margin-top: -20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const PillTxt = styled.Text`
  font-size: 16;
`;
const PillVerifyTxt = styled.Text`
  font-size: 16;
  margin-top: -10px;
  margin-bottom: -40px;
`;

const Btn = styled.Button``;
const DateTxt = styled.Text`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
  font-size: 16px;
`;
const Titletxt = styled.Text`
  background-color: ${BASE_COLOR};
  color: #202d35;
  font-size: 16px;
  font-weight: bold;
  margin-top: -10px;
`;
const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
`;
const Inner = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: ${SCREEN_WIDTH * 0.8};
  padding: 20px;
`;
const VerifyWrapper = styled.View`
  width: 50%;
`;
const VerifyContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const SubmitAlarm = styled.View`
  margin-top: 10px;
  flex: 1;
  height: 50%;
  vertical-align: text-top;
  justify-content: center;
  align-items: center;
`;
const SubmitTxt = styled.Button``;
const Reminder = () => {
  let verifying = useSelector((state) => state.verify.verify);
  let jwtToken = useSelector((state) => state.login.token);
  const navigation = useNavigation();
  const [CreatePrescriptionRecord, { data }] = useMutation(MEDICINE_ALARM);
  const [times, setTimes] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [pillscale, setPillscale] = useState(0);
  const [pillday, setPillday] = useState(0);
  const lastMedi = pillscale * pillday;
  const setVerify = verifying.toString();
  const Submit = () => {
    console.log(
      jwtToken,
      medicine,
      moment(date).format("HH:mm"),
      lastMedi,
      "데이터목록"
    );
    if (!setVerify) {
      Alert.alert("자신이 먹는 약봉투를 찍어주세요!");
      console.log("검증실패");
    } else {
      CreatePrescriptionRecord({
        variables: {
          jwt: jwtToken,
          medicine: medicine,
          alertTime: moment(date).format("HH:mm"),
          lastMedicationCount: lastMedi,
        },
      });
      Alert.alert("알람등록성공!");
      navigation.navigate("Home");
    }
  };

  console.log(date);
  console.log(verifying, "verifying");
  //////////////////////////////////////////////////////////////

  return (
    <ReminderContainer>
      <HeadWapper>
        <HeadTxt>알람등록하기</HeadTxt>
      </HeadWapper>
      <SubTxt>복용 알람을 등록하세요</SubTxt>
      <Inner>
        <Titletxt>약 이름을 입력해주세요</Titletxt>
        <TextInputs
          placeholder="약 이름"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          value={medicine}
          returnKeyType="next"
          onChangeText={(text) => setMedicine(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <PillTxt>하루에 몇 번 먹어야 하나요?</PillTxt>
        <TextInputs
          placeholder="하루에 먹는 약 개수"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          value={pillscale}
          returnKeyType="next"
          onChangeText={(text) => setPillscale(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <PillTxt>몇 일 동안 약을 드시나요?</PillTxt>
        <TextInputs
          placeholder=" 먹는 약 일수"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          value={pillday}
          returnKeyType="next"
          onChangeText={(text) => setPillday(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <Btn title="약은 언제 드시나요?" onPress={() => setOpen(true)}></Btn>
        <DatePicker
          modal
          mode="time"
          locale="ko"
          androidVariant="nativeAndroid"
          textColor="black"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DateTxt>설정한 시간: {moment(date).format("HH:mm")}</DateTxt>
        <VerifyContainer>
          <VerifyWrapper>
            <ImagePickerComponent onSubmit={callGoogleVisionAsync} />
            <PillVerifyTxt>검증상태 :{setVerify}</PillVerifyTxt>
          </VerifyWrapper>
          <SubmitAlarm>
            <SubmitTxt title="알람 등록" onPress={Submit}></SubmitTxt>
          </SubmitAlarm>
        </VerifyContainer>
      </Inner>
    </ReminderContainer>
  );
};
export default Reminder;
