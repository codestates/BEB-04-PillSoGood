import React from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";
import {
  StatusBar,
  Text,
  View,
  FlatList,
} from 'react-native';

const DATA = ['고지혈증', '고혈압', '당뇨'];

const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  marginTop: StatusBar.currentHeight || 0,
`;
const View = styled.View`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: '#DDECCA';
`;
const FlatList = styled.Text`
  font-size: 16px;
  text-align: center;
  color: black;
  border-radius: 20px;
`;
const Text = styled.View`
  textAlign: 'center'
  backgroundColor: '#DDECCA',
  padding: 20,
  fontSize: 20,
  `;

const Home = () => (
  <Container>
    <View>
      <Text> 메인
      </Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) =>
          <Text>
            {item}
          </Text>}
      />
      <View
        style={{
          height: 25,
          backgroundColor: Colors.pink,
          borderWidth: 0,
          width: 25,
          marginLeft: -26,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
        <Text> X
        </Text>
      </View>
    </View>
  </Container>
);
export default Home;
