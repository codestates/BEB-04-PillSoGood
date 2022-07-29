import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MEDICINE_ALARM } from "../src/query/MutationQuery";
import { useSelector } from "react-redux";
// import { set } from "immer/dist/internal";
import { Alert } from "react-native";

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  color: black;
  padding: 0px 20px;
`;
const Birds = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

const Header = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 5px;
  margin: 5px;
  background-color: transparent;
  justify-content: space-between;
`;
const HeadTxt = styled.Text`
  color: #76a991;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 1px 3px 3px white;
`;
const MainTxt = styled.Text`
  color: "rgba(255, 255, 255, 0.7)";
  font-size: 15px;
  font-weight: bold;
  padding-left: 20px;
  margin-top: -25px;
`;
const Card = styled.View`
  flex: 0.3;
  padding: 23px;
  margin: 10px 0px;
  background: papayawhip;
  border-radius: 30px;
  border-width: 3px;
  border-color: "rgba(255, 255, 255, 0.7)";
`;

const Cardtxt = styled.Text`
  color: black;
  font-size: 15px;
`;

const Btn = styled.TouchableOpacity`
  margin-top: 40px;
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
const AlarmBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: #76a991;
  align-items: center;
  justify-content: center;
`;
const AlarmText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

const Home = ({ navigation: { navigate } }) => {
  let jwtToken = useSelector((state) => state.login.token);
  const [MedicineName, setMedicineName] = useState("");
  const [MedicineCount, setMedicineCount] = useState(0);
  const [AlertTime, setAlertTime] = useState("");
  //Query
  const [GetPrescriptionRecords, { data, loading, error }] =
    useQuery(GET_MEDICINE_ALARM);
  //Mutation
  const [CreatePrescriptionRecord] = useMutation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const MedicineRecord = GetPrescriptionRecords({
      variables: {
        jwt: jwtToken,
      },
    });
    if (loading) return "알람 목록받아오는중...";
    if (error) return `데이터받아오기 에러발생! ${error.message}`;
    MedicineRecord.then((appdata) => {
      if (!jwtToken) {
        Alert.alert("토큰이 없습니다.");
      } else {
        console.log(MedicineName, MedicineCount, MedicineRecord, "데이터");
        setMedicineName(appdata.data.GetPrescriptionRecords.medicine);
        setMedicineCount(
          appdata.data.GetPrescriptionRecords.lastMedicationCount
        );
        setAlertTime(appdata.data.GetPrescriptionRecords.alertTime);
      }
    });
  }, [loading]);

  return (
    <Container>
      <Header>
        <HeadTxt>Pill So Good</HeadTxt>
        <Birds source={require("../src/assets/highland.jpg")} />
      </Header>

      <MainTxt> 약 먹을 시간입니다!</MainTxt>

      {visible ? (
        <Card>
          <Cardtxt>약 이름:{MedicineName}</Cardtxt>
          <Cardtxt>남은약 :{MedicineCount}</Cardtxt>
          <Cardtxt>알림시간: {AlertTime}</Cardtxt>
          <Btn
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <BtnText>꼭 챙겨 먹으셔야해요!</BtnText>
          </Btn>
        </Card>
      ) : null}

      <AlarmBtn onPress={() => navigate("Reminder")}>
        <AlarmText>알람 등록하기</AlarmText>
      </AlarmBtn>
    </Container>
  );
};

export default Home;
