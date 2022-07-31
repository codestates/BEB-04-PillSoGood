import React, { useState } from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../colors";
import { useSelector } from "react-redux";
import { Alert, Dimensions } from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  background-color: ${BASE_COLOR};
  flex: 1;
  align-items: center;
  color: black;
  padding: 0px 20px;
`;
const HeadWapper = styled.View`
  flex: 0.1;
  background-color: #76a991;
  border-radius: 20px;
  width: ${SCREEN_WIDTH * 0.7};
  align-items: center;
`;

const HeaderTxt = styled.Text`
  margin-top: 15px;
  color: white;
  font-size: 25px;
  font-weight: bold;
`;
const MyHealth = () => (
  <Container>
    <HeadWapper>
      <HeaderTxt>내 건강정보</HeaderTxt>
    </HeadWapper>
  </Container>
);
1;
export default MyHealth;
