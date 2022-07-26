import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
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
const ViewRN = styled.View``;
const PillBtn = styled.Button``;
const Touch = styled.TouchableOpacity``;

const Imges = styled.Image``;
const Reminder = () => {
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
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: "",
      isVisible: false,
    },
  });
  console.log(date);
  const onButtonPress = () => {
    launchImageLibrary();
  };
  //////////////////////////////////////////////////////////////
  function onPress(type) {
    setState({ ...state, loading: true });
    type === "capture"
      ? launchCamera({ mediaType: "image" }, onImageSelect)
      : launchImageLibrary({ mediaType: "image" }, onImageSelect);
  }
  async function onImageSelect(media) {
    if (!media) {
      setState({ ...state, loading: false });
      return;
    }
    if (!!media && media.assets) {
      const file = media.assets[0].uri;
      const textRecognition = await RNTextDetector.detectFromUri(file);
      const INFLIGHT_IT = "Inflight IT";
      //if match toast will appear
      const matchText = textRecognition.findIndex((item) =>
        item.text.match(INFLIGHT_IT)
      );
      setState({
        ...state,
        textRecognition,
        image: file,
        toast: {
          message: matchText > -1 ? "Ohhh i love this company!!" : "",
          isVisible: matchText > -1,
        },
        loading: false,
      });
    }
  }
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

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
      <PillBtn title="약 언제 먹을래요?" onPress={() => setOpen(true)} />
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

      <ViewRN>
        <PillTxt>RN OCR SAMPLE</PillTxt>
        <ViewRN>
          <Touch onPress={() => onPress("capture")}>
            <PillTxt>Take Photo</PillTxt>
          </Touch>
          <ViewRN>
            <Touch onPress={() => onPress("library")}>
              <PillTxt>Pick a Photo</PillTxt>
            </Touch>
          </ViewRN>
          <ViewRN>
            <ViewRN>
              <Imges source={{ uri: state.image }} />
            </ViewRN>
            {!!state.textRecognition &&
              state.textRecognition.map((item, i) => (
                <PillTxt key={i}>{item.text}</PillTxt>
              ))}
          </ViewRN>
        </ViewRN>
        {state.toast.isVisible &&
          ToastAndroid.showWithGravityAndOffset(
            state.toast.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          )}
      </ViewRN>
    </ReminderContainer>
  );
};
export default Reminder;
