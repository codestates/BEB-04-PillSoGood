import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalSlice";

function ImagePickerComponent({ onSubmit }) {
  let username = useSelector((state) => state.login.nickname);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");
  const dispatch = useDispatch();
  console.log(text.includes(username), "data");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true, //return base64 data.
      //this will allow the Vision API to read this image.
    });

    if (!result.cancelled) {
      //if the user submits an image,
      setImage(result.uri);
      //run the onSubmit handler and pass in the image data.
      setText("Loading.."); //set value of text Hook
      const responseData = await onSubmit(result.base64);
      setText(responseData.text); //change the value of this Hook again.
    }
    if (text.includes(username)) {
      dispatch(modalActions.setModalOpen(true)); //success modal 열림
    } else {
      dispatch(modalActions.setModalOpen(false)); //fail modal 열림
    }
  };
  return (
    <View>
      <Button title="약 봉투를 찍어주세요!" onPress={pickImage} />
    </View>
  );
}
export default ImagePickerComponent;
