import React from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../../colors";

// Container가 ScrollView이기 때문에 그냥 View로
const Container = styled.ScrollView`
  background-color: ${BASE_COLOR};
  flex: 1;
`;

const Header = styled.ScrollView`
  flex: 1;
`;

const Mileage = styled.View`
  flex: 1;
`;

const Mid = styled.View`
  flex: 1;
`;

const Headimg = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Bring = styled.TouchableOpacity`
  margin-top: 30px;
  width: 40%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  background-color: grey;
`;

const Midimg = styled.Image`
  width: 200px;
  height: 320px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const Footer = styled.View`
  flex-direction: row;
`;

const Grow = styled.TouchableOpacity`
  margin-top: 30px;
  width: 40%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);

  background-color: grey;
`;

const Mint = styled.TouchableOpacity`
  margin-top: 30px;
  width: 40%;
  padding: 20px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: rgba(255, 255, 255, 0.5);

  background-color: grey;
`;

const Text = styled.Text`
  color: black;
  font-size: 16px;
  text-align: center;
`;

const Mo1 = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const View = styled.View`
  justify-content: center;
`;

const list = [
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/1.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/2.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/3.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/4.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/5.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/6.jpeg",
  "https://gateway.pinata.cloud/ipfs/QmZ9LAhzGAimekUEGKUqm3XdE5kYhJW24FzNLioD4DnALD/7.jpeg",
  "https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
  "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
  "https://picsum.photos/id/100/2500/1656",
  "https://picsum.photos/id/1001/5616/3744",
];

const Characters = () => {
  return (
    <Container>
      <Text>발행된 NFT 리스트</Text>
      <Header horizontal>
        {list.map((img, id) => (
          <Mo1 key={id}>
            <Headimg source={{ uri: img }} />
          </Mo1>
        ))}
      </Header>
      <Bring>
        <Text>옮기기</Text>
      </Bring>
      <Mid>
        <Text>나의 마일리지 : 100 </Text>
      </Mid>
      <Midimg
        source={{
          uri: "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        }}
      />
      <Footer>
        <Grow>
          <Text>성장하기</Text>
        </Grow>
        <Mint>
          <Text>Nft 발행하기</Text>
        </Mint>
      </Footer>
    </Container>
  );
};
export default Characters;
