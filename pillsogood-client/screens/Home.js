import React, { useState } from "react";
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
  padding: 20px 20px 60px ;

`;
const Birds = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const Header = styled.View`
  flex: 0.3
  padding: 15px;
  margin: 5px
  background: rgba(255, 255, 255, 0.7)";
  background-color:transparent;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Card = styled.View`
  flex:1;
  padding: 23px;
  margin: 10px 0px;
  background: papayawhip;
  border-radius: 30px;
  border-width: 2px;
  border-color: "rgba(255, 255, 255, 0.7)";
`;
const MainTxt = styled.Text`
  color: "rgba(255, 255, 255, 0.7)";
  font-size: 15px;
  font-weight: bold;
  padding-left: 25px;
  margin-top: -20px;

`;
const HeadTxt = styled.Text`
  color: #0D99FF;
  font-size: 30px;
  font-weight: bold;
  
`;

const Cardtxt = styled.Text`
  color: black;
`;

const Btn = styled.TouchableOpacity`
  margin-top: 40px;
  width: 100%;
  padding: 10px 
  border-width: 1px;
  border-radius: 50px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: space-between;
  align-items: center;
  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
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


const Home = () => {
  const DATA = ["고지혈증", "고혈압", "당뇨"];
  const today = new Date();
  const [visible, setVisible] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();
    changeModalVisible = (bool) => {
    setisModalVisible(bool);
  };
  
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


      <MainTxt> 당신의 건강을 책임지는 </MainTxt>  

        {
          visible ? (
          <Card>
            <Cardtxt>{DATA[0]}</Cardtxt>
            <Btn onPress={()=> setVisible(!visible)}> 
              <BtnText>약 먹었어요~</BtnText>
            </Btn>
          </Card>
          ) : null
        }
      <Card>
        <Cardtxt>{DATA[1]}</Cardtxt>
        <Btn>
          <BtnText>먹었습니다</BtnText>
        </Btn>
      </Card>


      <Card>
        <Cardtxt>{DATA[2]}</Cardtxt>
        <Btn>
          <BtnText>먹었습니다</BtnText>
        </Btn>
      </Card>
      
      <Cardtxt>
        {chooseData}
      </Cardtxt>
      
      {/* 모달시작 */}
      <Modaltouch
        onPress={()=> changeModalVisible(true)}
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
      </Modals>

    </Container>
  );
};

export default Home;
