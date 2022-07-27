import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";
import ImagePickerComponent from "../../src/utils/ImagePickerComponent";
import callGoogleVisionAsync from "../../src/utils/helperFunctions";

import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { SuccessModal } from "../../src/components/SuccessModal";
import { FailModal } from "../../src/components/FailModal";
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
  color: #76a991;
  font-size: 30px;
  font-weight: bold;
  margin: 10px 10px 0px 20px;
`;
const HeadWapper = styled.View`
  flex: 1;
`;

const SubTxt = styled.Text`
  color: #202d35;
  font-size: 19px;
  font-weight: bold;
  margin-top: -30px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
const PillTxtInput = styled.TextInput`
  font-size: 16;
`;
const PillTxt = styled.Text`
  font-size: 16;
`;
const ViewRN = styled.View`
  flex-direction: row;
`;
const PillBtnTxt = styled.Text`
  color: #fff;
`;
const Btn = styled.Button``;

const Titletxt = styled.Text`
  background-color: ${BASE_COLOR};
  color: #202d35;
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
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
  flex: 5;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: ${SCREEN_WIDTH * 0.8};
  padding: 20px;
`;
const Reminder = () => {
  let verifying = useSelector((state) => state.verify.verify);
  let modalopend = useSelector((state) => state.verify.modalopend);
  const [response, setResponse] = useState(null);

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
  console.log(verifying, "verifying");
  //////////////////////////////////////////////////////////////

  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

  return (
    <ReminderContainer>
      {verifying !== false ? (
        <>
          (
          <HeadWapper>
            <HeadTxt>약 복용 입력</HeadTxt>
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
              onChangeText={(text) => setPill(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            />
            <PillTxt>하루에 몇번 먹어야 하나요?</PillTxt>
            <TextInputs
              placeholder="오늘 먹는 약 횟수"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              value={pillscale}
              returnKeyType="next"
              onChangeText={(text) => setMedicine(text)}
              placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
            />
            <Btn
              title="약은 언제 드시나요?"
              onPress={() => setOpen(true)}
            ></Btn>
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
            {date.length == 0
              ? date.map((item, key) => {
                  <PillTxt key={key}>{item}</PillTxt>;
                })
              : null}
          </Inner>
          )
        </>
      ) : (
        <>
          {!modalopend ? <SuccessModal /> : <FailModal />}
          <HeadWapper>
            <HeadTxt>약 봉투 검증</HeadTxt>
          </HeadWapper>
          <SubTxt>복용 알람을 등록하세요</SubTxt>
          <ImagePickerComponent onSubmit={callGoogleVisionAsync} />
        </>
      )}
    </ReminderContainer>
  );
};
export default Reminder;
