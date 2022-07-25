import React, { useState,useEffect} from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import { Pressable, Image, StatusBar, Text, View, FlatList } from "react-native";
// import { Card } from "../src/components/Card";
import { dateHead } from "../src/components/dateHead"
import { SimpleModal } from "../src/components/SimpleModal";
// import { set } from "immer/dist/internal";
import { WrapperComponent } from "../src/components/WrapperComponent";

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  color: black;
  padding: 0px 20px ;

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
  margin: 5px
  background-color:transparent;
  justify-content: space-between;
`;
const HeadTxt = styled.Text`
  color: #76a991;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 1px 3px 3px papayawhip;
`;
const MainTxt = styled.Text`
  color: "rgba(255, 255, 255, 0.7)";
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
  margin-top: -30px;

`;
const Card = styled.View`
  flex:0.3
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
const AlarmBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 
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
const Modals = styled.Modal`
  color: white;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const Modaltouch = styled.TouchableOpacity`
  color: white;
  justify-content: space-between;
  align-items: center;
  text-align: center; 
  virtical-align: center;
`;
const ModalCircle = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  align-items: center;
  background: blue;
`;


const Home = ({ navigation: { navigate } }) => {
  const DATA = ["고지혈증", "고혈압", "당뇨"];
  const today = new Date();
  const [visible, setVisible] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();
    changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    setCurrentDate(
      year + '/' + month + '/' + date 
      + ' ' + hours + ':' + min
    );
  }, []);

  const setData = (data) => {
    setchooseData(data);
  }

  return (
    <Container>
      <WrapperComponent />
      <Header> 
        <HeadTxt>Pill So Good</HeadTxt>  
        <Birds
          source={require('../src/assets/bird.png')}/>
      </Header>     


      <MainTxt> 약 먹을 시간입니다!</MainTxt>  

        {
        visible
          ? (
          <Card>
            <Cardtxt>{currentDate}</Cardtxt>
            <Cardtxt>{DATA[0]}</Cardtxt>
            <Btn onPress={() => {
              setVisible(!visible)
            }}> 
              <BtnText>약 먹었어요~</BtnText>
            </Btn>
          </Card>
          
          )
          : null
        }
      <Card>
        <Cardtxt>{DATA[1]}</Cardtxt>
        <Btn onPress={() => {
          setVisible(!visible)
            }}> 
          <BtnText>약 먹었어요~</BtnText>
        </Btn>
      </Card>


      <Card>
        <Cardtxt>{DATA[2]}</Cardtxt>
        <Btn onPress={() => {
          setVisible(!visible)
            }}> 
          <BtnText>약 먹었어요~</BtnText>
        </Btn>
      </Card>
      

        <AlarmBtn onPress={() => navigate("Reminder")}>
          <AlarmText>알람 등록하기</AlarmText>
        </AlarmBtn>


      {/* <Cardtxt>
        {chooseData}
      </Cardtxt> */}
      
      {/* 모달시작 */}
      {/* <Modaltouch
        onPress={()=> changeModalVisible(true)
        // onBackdropPress={() => setModalVisible(false)
        //콘텐츠 외부 눌러 모달 숨기기
        }
        >
          <ModalCircle>
          <BtnText>약 추가</BtnText>
          </ModalCircle>
      </Modaltouch>

      <Modals
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisible(false)}
      >
        <SimpleModal
          changeModalVisible={isModalVisible}
          setData={setData}
        />
      </Modals> */}

    </Container>
  );
};

export default Home;
