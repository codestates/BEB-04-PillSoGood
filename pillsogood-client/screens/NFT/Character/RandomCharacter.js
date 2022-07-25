import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-web-swiper";
import { BASE_COLOR } from "../../../colors";

//  import { NFTStorage } from "nft.storage";

// 0번째 이슈 : 이미지 뽑고 나서 단일 이미지만 보여야 하는데 여러 이미지가 같이 보임 ---- 대충 해결? random Num이 9까지 생성되는데 샘플 리스트는 9미만 이엇음
// 1번째 이슈 : result에 배열을 담아와도 maps를 사용 못함. 직접 변수 list를 선언하여 maps를 돌릴 때는 정상 진행; --- 해결. Loading 순서 바뀜
// 2. 캐릭터 뽑으면 해당 url을 서버에 mutation 요청 필요.
// 3. refresh시 화면 초기화 모든 기능 초기화 필요
// 4. CSS 꾸미기
// 5. Code refactoring

// +@ 선택된 캐릭터들은 캐릭터 목록 리스트에서 제거되어야 함..

// 7/25 이슈 및 구현 필요사항
// 1.setRandomImg 먹통
// 2. Nft.storage 사용 불가
// 3. 작명하기 버튼 클릭시 서버에 mutation 필요
// 4. css 수정

const Text = styled.Text``;

const Header = styled.Text`
  color: black;
  font-size: 12px;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const Middle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const MidText = styled.Text`
  margin-top: 50px;
  justify-content: center;
  text-align: center;
`;

const Container = styled.ScrollView`
  background-color: ${BASE_COLOR};
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BASE_COLOR};
`;

const BgImg = styled.Image`
  flex: 1;
`;

const BgImg2 = styled.Image`
  width: 320px;
  height: 320px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;

const Selected = styled.Image`
  flex: 1;
  border-radius: 20px;
  margin-left: 50px;
  margin-right: 50px;
`;

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

const TextInputs = styled.TextInput`
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: black;
  background-color: #ffffff7f;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const RandomCharacter = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [draw, setDraw] = useState(false);
  const [randomImg, setRandomImg] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState("");
  console.log("randomImg:", randomImg);
  const [description, setDescription] = useState("");
  const [metadata, setMetadata] = useState("");

  const getImage2 = async () => {
    // 1번째 이슈 : result에 배열을 담아와도 maps를 사용 못함. 직접 변수 list를 선언하여 maps를 돌릴 때는 정상 진행;

    const res = await fetch(
      "https://gateway.pinata.cloud/ipfs/QmfExvMdoWcQMNihsexYLfaCaGGQjFw851NiFwn1Hy9LaK"
    );
    const json = await res.json();
    setResult(json);
    console.log(result);
    setLoading(false);
  };

  useEffect(() => {
    getImage2();
  }, []);

  const Draw = () => {
    // 버튼 누르면 로딩 애니메이션 뜨고 5초 뒤에 랜덤 뽑기 실행

    console.log(draw);
    const randomNumber = Math.floor(Math.random() * 10); // 10 이하의 랜덤 넘버 생성. 인덱스로 들어갈 예정
    console.log(randomNumber);

    const pic = result[randomNumber];
    const picJson = JSON.stringify(pic);
    console.log(picJson, "picJson");

    try {
      setTimeout(() => {
        // 3초 뒤 랜덤 뽑기 실행
        // URL에서 받아온 이미지 데이터의 랜덤 인덱스값으로 RandomImg값 변경
        setRandomImg(picJson);
        console.log("setTimeOut console:", randomImg);
        Alert.alert(" 캐릭터를 생성했습니다!");
      }, 3000);
      setDraw(true);
    } catch (e) {
      console.error(e);
    }
    //3초 동안 로딩 이미지 보여주어야 함

    // 서버에 mutation 요청 필요

    // 성공 alert 떠야됨
  };

  const Write = () => {};
  const onRefresh = () => {
    setRefreshing(true);
    setDraw(false);
    setRefreshing(false);
    setRandomImg([]);
  };

  // const characterIssue = async () => {
  //   try {
  //     const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyM2JlNzc4ZDE5RTQ2NzI0ZjI4QThlYUFhMUI4MTAxZEY3ODY4ZTUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODcxMzQ4MzQ4MSwibmFtZSI6InRlc3QxIn0.cHAy-MaOtNd50WU-ww799_PkrDdHsghRms98FAycd2Q"
  //     const client = new NFTStorage({ token: apiKey})

  //     metadata = await client.store({
  //       name: name,
  //       description: description,
  //       image: randomImg
  //     })
  //     setMetadata(metadata)
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : randomImg.length === 0 ? (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <Header> 캐릭터 리스트 </Header>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
      >
        {result.map((img, index) => (
          <View key={index}>
            <BgImg style={StyleSheet.absoluteFill} source={{ uri: img }} />
          </View>
        ))}
      </Swiper>

      {draw === false ? (
        <View>
          <MidText>캐릭터를 뽑으시려면 버튼을 클릭해주세요</MidText>
        </View>
      ) : (
        <Swiper
          loop
          timeout={0.1}
          controlsEnabled={false}
          containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 3 }}
        >
          {result.map((img, index) => (
            <View key={index}>
              <BgImg source={{ uri: img }} />
            </View>
          ))}
        </Swiper>
      )}

      <Button>
        <BtnText onPress={Draw}>뽑기</BtnText>
      </Button>
    </Container>
  ) : (
    <Container
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <View>
        <Text>당신의 캐릭터를 환영해주세요</Text>
      </View>
      <BgImg2 source={{ uri: randomImg }} />
      <Text> 캐릭터를 다시 뽑으시려면 화면을 스크롤해 새로고침 해주세요 </Text>
      <TextInputs
        placeholder="캐릭터 이름을 지어주세요"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={name}
        returnKeyType="next"
        onChangeText={(text) => setName(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />
      <TextInputs
        placeholder="간단한 설명을 입력해주세요"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={description}
        returnKeyType="next"
        onChangeText={(text) => setDescription(text)}
        placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
      />

      <Button>
        <BtnText onPress={Write}>작명하기</BtnText>
      </Button>
    </Container>
  );
};

export default RandomCharacter;
