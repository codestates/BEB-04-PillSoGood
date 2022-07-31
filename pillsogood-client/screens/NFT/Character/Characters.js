import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../../colors";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import Swiper from "react-native-web-swiper"
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import { NftQuery, NftTransfer } from "../../../src/query/MutationQuery";
import { Linking } from 'react-native';


const View = styled.View`
flex: 1;
`;

const Text = styled.Text`
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BASE_COLOR};
`;


const Container = styled.ScrollView`
background-color: ${BASE_COLOR};
`;

const HeaderView = styled.View`
flex: 1;
background-color: #ffffff7f;


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
margin-top: -15px;
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

const HashView = styled.View`
margin-top: 20px;
`
const HashText = styled.Text`
text-align: center;
`
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const list = [
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/1.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/2.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/3.jpeg",
  "https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
];

const Characters = () => {
  
  
  const [refreshing, setRefreshing] = useState(false);
  const [metaMaskaddr, setMetaMaskaddr] = useState("")
  const [tokId, setTokId] = useState("")
  const [transferCharacter] = useMutation(NftTransfer)
  const jwt = useSelector((state) => state.login.token )
  const {loading, data, error} = useQuery(NftQuery, { variables: {jwt: jwt}})
  const [loading1, setLoading1] = useState(false)
  const [txHash, setTxHash] = useState("")
  // const obj = Object.entries(data.getCharacters[0])
  // console.log('obj:', obj[2])
  // console.log('data', data)
 
//  console.log('detailData:', data.getCharacters)
  // Nft 정보 가져오기 ( Query )

  useEffect(()=> {
    
  }, [data])

  // 새로고침 함수
  const onRefresh = () => {
    setRefreshing(true);
    setTxHash("")
    setRefreshing(false);
    
  };

  // 옮기기 버튼 누르면 실행될 함수 ( Mutation )
  const Move = () => {
    setLoading1(true)
    transferCharacter({
      variables: {
        jwt: jwt,
        tokenId: tokId,
        receiverAddress: metaMaskaddr
      }
    }).then((res)=>{
      setLoading1(false)
      if(res){
        console.log("옮기기 성공 :", res)
        Alert.alert(`Nft를 성공적으로 가져왔습니다! 아래의 링크에서 확인하세요 `)
        setTxHash(`https://rinkeby.etherscan.io/tx/${res.data.transferCharacter.transferHash}`)
      }
      else{
        console.log("옮기기 실패:", res)
        Alert.alert("Nft를 가져오지 못했습니다")
      }
    })
    setMetaMaskaddr("")
    setTokId("")
  }

  return ( 
    loading || loading1 ? (
      <Loader>
        <ActivityIndicator />
      </Loader>
    ) 
    :
    <Container
     refreshControl={
      <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
    }>											
    <HeaderView><Header>My NFT list</Header></HeaderView>			
    <Swiper
     loop
     controlsEnabled={false}
     containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
     >  
     {/* {console.log('Swiper data:', data.getCharacters)}               */}
      { 
      data.getCharacters.map((info, index)=>(
      <View key={index}>
        <BgView  style={StyleSheet.absoluteFill}
        />
        <Wrapper>
        <NftImage source={{ uri: info.baseId}}/>
          <Column>
          <Name> name : {info.name}</Name>
          <TokId> tokenId : {info.tokenId} </TokId>
          <Description> description : </Description>
          <DesDetail> {info.description} </DesDetail>
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
          value={metaMaskaddr}
          returnKeyType="next"
          onChangeText={(text) => setMetaMaskaddr(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
        <TextInputs
          placeholder="tokenId를 입력해주세요"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          value={tokId}
          returnKeyType="next"
          onChangeText={(text) => setTokId(text)}
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
        />
      </TextInputView>
      <ButtonView><Button onPress={Move} ><BtnText>옮기기</BtnText></Button></ButtonView>
      
      { txHash ? (
      <HashView>
      <HashText style={{color: 'blue'}} onPress={() => Linking.openURL(txHash)}>
      Click here to see your Transfer
      </HashText>
      </HashView>)
      
      : null
      }

      
  
    </Container>  
  );
  };
export default Characters;


