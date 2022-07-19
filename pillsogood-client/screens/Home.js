import React from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../colors";


const DATA = ['고지혈증', '고혈압', '당뇨'];

// const Container1 = styled.Container`
//   background-color: ${BASE_COLOR};
//   flex: 1;
//   marginTop: StatusBar.currentHeight || 0,
// `;
const View1 = styled.View`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: '#DDECCA';
`;
const FlatList1 = styled.FlatList`
  font-size: 16px;
  text-align: center;
  color: black;
  border-radius: 20px;
`;
const Text1 = styled.Text`
  textAlign: 'center'
  backgroundColor: '#DDECCA',
  padding: 20,
  fontSize: 20,
  `;

const Home = () => (
    <View1>
      <Text1> 메인
      </Text1>
      <FlatList1
        data={DATA}
        renderItem={({ item }) =>
          <Text1>
            {item}
          </Text1>}
      />
      <View1
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
        <Text1> 
        </Text1>
      </View1>
    </View1>

);
export default Home;
