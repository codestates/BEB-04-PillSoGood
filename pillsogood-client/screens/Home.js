import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_MEDICINE_ALARM,
  POST_MEDICINE_RECORD,
} from "../src/query/MutationQuery";
import { useSelector } from "react-redux";
// import { set } from "immer/dist/internal";
import { Alert, Text, View, FlatList, Modal } from "react-native";
import CheckModal from "../src/components/CheckModal";
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
  flex: 0.15;
  padding: 23px;
  margin: 10px 0px;
  background: papayawhip;
  border-radius: 20px;
  border-width: 3px;
  border-color: "rgba(255, 255, 255, 0.7)";
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Cardtxt = styled.Text`
  color: black;
  font-size: 17px;
`;
const CardElementContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
const Btn = styled.TouchableOpacity`
  width: 75px;
  height: 75px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 17px;
`;
const AlarmBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border-radius: 25px;
  border-color: rgba(255, 255, 255, 0.5);
  background-color: #76a991;
  align-items: center;
  justify-content: center;
  bottom: 10;
  left: 20;
  position: absolute;
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
  //Query
  const { data, loading, error, refetch } = useQuery(GET_MEDICINE_ALARM, {
    variables: {
      jwt: jwtToken,
    },
  });
  //Mutation
  const [createMedicationRecord] = useMutation(POST_MEDICINE_RECORD);
  //
  // const [CreatePrescriptionRecord] = useMutation();
  const renderAlarm = ({ item }) => {
    <Card>
      <CardElementContainer>
        <View>
          <Cardtxt>약 이름:{item.medicine}</Cardtxt>
          <Cardtxt>남은약 개수: {item.lastMedicationCount}</Cardtxt>
          <Cardtxt>{item.alertTime}</Cardtxt>
        </View>
        <Btn
          onPress={() => {
            //배열에 해당하는 key을 지운다.
            // setInitialData(() => {
            //   const filterData =
            //     initialData.getPrescriptionRecords.filter(
            //       (value, index) => {
            //         return index !== key;
            //       }
            //     );
            //   return filterData;
            // });

            setMedicineName(item.medicine);
            setMedicineCount(item.lastMedicationCount);
            setAlertTime(item.alertTime);
            createMedicationRecord({
              variables: {
                jwt: jwtToken,
                medicine: MedicineName,
                condition: "건강함",
              },
            });
            refetch({
              variables: {
                jwt: jwtToken,
              },
            });
          }}
        >
          <BtnText>확인</BtnText>
        </Btn>
      </CardElementContainer>
    </Card>;
  };
  console.log(data);
  if (loading) return <Text>Loading...</Text>;
  if (error)
    return (
      <>
        <Text>Error...</Text>
      </>
    );
  useEffect(() => {
    refetch;
  }, [data]);
  const [initialData, setInitialData] = useState(data);
  console.log(initialData, "initial");
  return (
    <Container>
      <View>
        <Header>
          <HeadTxt>Pill So Good</HeadTxt>
          <Birds source={require("../src/assets/highland.jpg")} />
        </Header>
        <View>
          <MainTxt> 약 먹을 시간입니다!</MainTxt>
        </View>
      </View>
      {/* <CheckModal setModalVisible={setModalVisible} /> */}
      {initialData.getPrescriptionRecords.map((item, key) => {
        return (
          <Card key={key}>
            <CardElementContainer>
              <View>
                <Cardtxt>약 이름:{item.medicine}</Cardtxt>
                <Cardtxt>남은약 개수: {item.lastMedicationCount}</Cardtxt>
                <Cardtxt>{item.alertTime}</Cardtxt>
              </View>
              <Btn
                onPress={() => {
                  //배열에 해당하는 key을 지운다.
                  // setInitialData(() => {
                  //   const filterData =
                  //     initialData.getPrescriptionRecords.filter(
                  //       (value, index) => {
                  //         return index !== key;
                  //       }
                  //     );
                  //   return filterData;
                  // });
                  // setModalVisible(true);
                  setMedicineName(item.medicine);
                  setMedicineCount(item.lastMedicationCount);
                  setAlertTime(item.alertTime);
                  createMedicationRecord({
                    variables: {
                      jwt: jwtToken,
                      medicine: MedicineName,
                      condition: "건강함",
                    },
                  });
                  refetch;
                }}
              >
                <BtnText>확인</BtnText>
              </Btn>
            </CardElementContainer>
          </Card>
        );
      })}

      <AlarmBtn onPress={() => navigate("Reminder")}>
        <AlarmText>알람 등록하기</AlarmText>
      </AlarmBtn>
    </Container>
  );
};

export default Home;

const a = {
  getPrescriptionRecords: [
    {
      __typename: "Prescription",
      _id: "62e287a413801f52604275a7",
      alertTime: "21:55",
      createdAt: "2022-07-28 21:57:08",
      lastMedicationCount: 30,
      medicine: "test",
    },
  ],
};
