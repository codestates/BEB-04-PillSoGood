import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const GetCharacter = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("GetCharacter")}>
    <Text>GetCharacter</Text>
  </TouchableOpacity>
);

export const CharactersLink = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Character")}>
    <Text>CharactersLin</Text>
  </TouchableOpacity>
);
export const CharacterDeco = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("CharacterDeco")}>
    <Text> CharacterDeco</Text>
  </TouchableOpacity>
);
export const GetNFTItemlink = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("GetNFTItem")}>
    <Text>GetNFTItemlink</Text>
  </TouchableOpacity>
);
