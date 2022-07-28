import React from "react";
import styled from "styled-components/native";
import { BASE_COLOR } from "../../../colors";
import { useMutation, useQuery, gql } from "@apollo/client";


const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;