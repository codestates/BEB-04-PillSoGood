import React from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../../colors";
import { useMutation, useQuery, gql } from "@apollo/client";
import Swiper from "react-native-web-swiper"
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";

const View = styled.View`
flex: 1;
`;

const Text = styled.Text`
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


const Container = styled.ScrollView`
background-color: ${BASE_COLOR};
`;

const HeaderView = styled.View`
flex: 1;
`;

const Header = styled.Text`
font-size: 16px;
font-weight: 600;
margin-top: 22px;
margin-bottom: 22px;
text-align: center;
`;

const BgView = styled.View`
background-color: white;
flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;



const Column = styled.View`
width: 40%;
margin-left: 15px;
`;


const NftImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 5px;
`;


const Name = styled.Text`
`

const TokId = styled.Text`
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

const Description = styled.Text`
margin-top: 15px;
`;

const DesDetail = styled.Text`
margin-top: 7px;
line-height: 20;
`;

const TextInputView = styled.View`
margin-top: 30px;
  align-items: center;
`;

const TextInputs = styled.TextInput`
width: 90%;
margin-top: 10px;
padding: 10px 20px;
border-radius: 20px;
margin-bottom: 10px;
font-size: 16px;
color: black;
background-color: #ffffff7f;
`;

const ButtonView = styled.View`
margin-top: 15px;
`

const Button = styled.TouchableOpacity`
  margin-top: 30px;
  width: 40%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  margin-left: 120px;
  background-color: grey;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const list = [
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/1.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/2.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/3.jpeg",
  "https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
];

const Characters = () => {
  
  return (
    <Container>											
    <HeaderView><Header>NFT list</Header></HeaderView>			
    <Swiper
     loop
     controlsEnabled={false}
     containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
     >                
      {list.map((info, index)=>(
      <View key={index}>
        <BgView  style={StyleSheet.absoluteFill}
        />
        <Wrapper>
        <NftImage source={{ uri: info }}/>
          <Column>
          <Name> name : Test</Name>
          <TokId> tokenId : 13</TokId>
          <Description> description : </Description>
          <DesDetail>abcdabcdadfadfasdfadfasdfasdfadfasdfdsfdfzcvzxfasdwqewqwezdfsdfsdfsdfsdfsdf </DesDetail>
          </Column>
        </Wrapper>
      </View>))}
    </Swiper>
    <TextInputView>
        <TextInputs
          placeholder="메타마스크 계정 주소를 입력해주세요"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          // value={}
          returnKeyType="next"
          // onChangeText={(text) => setName(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <TextInputs
          placeholder="tokenId를 입력해주세요"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          // value={}
          returnKeyType="next"
          // onChangeText={(text) => setDescription(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </TextInputView>
      <ButtonView><Button><BtnText>옮기기</BtnText></Button></ButtonView>
    </Container>  
  );
  };
export default Characters;


