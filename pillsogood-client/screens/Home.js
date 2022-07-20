import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import { StatusBar, Text, View, FlatList } from "react-native";

const Container = styled.View`
  background-color: "beige";
  flex: 1;
  justify-content: space-between;
  color: black;
  padding: 20px;
  margin: 10px;
`;
const Card = styled.Text`
  flex: 0.3;
`;

const LoginBtn = styled.TouchableOpacity`
  margin-top: 50px;
  width: 60%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: space-between;
  align-items: center;

  background-color: #202d35;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Home = () => {
  const DATA = ["고지혈증", "고혈압", "당뇨"];
  const [visible, setVisible] = useState(true);
  const onPress = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Text> 메인</Text>
      <Card>{DATA}</Card>
      <LoginBtn>
        <BtnText onPress={onPress}>먹었습니다</BtnText>
      </LoginBtn>
    </Container>
  );
};
export default Home;
