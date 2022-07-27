import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text } from "react-native";
import { useSelector } from "react-redux";
Date.prototype.format = function (f) {
  if (!this.valueOf()) return " ";

  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case "yyyy":
        return d.getFullYear();
      case "yy":
        return (d.getFullYear() % 1000).zf(2);
      case "MM":
        return (d.getMonth() + 1).zf(2);
      case "dd":
        return d.getDate().zf(2);
      case "E":
        return weekName[d.getDay()];
      case "HH":
        return d.getHours().zf(2);
      case "hh":
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case "mm":
        return d.getMinutes().zf(2);
      case "ss":
        return d.getSeconds().zf(2);
      case "a/p":
        return d.getHours() < 12 ? "오전" : "오후";
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = "",
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return "0".toString(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};
function ImagePickerComponent({ onSubmit }) {
  let username = useSelector((state) => state.nickname);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Please add an image");
  const currentDate = new Date();
  const filterDate = currentDate.format("yyyy/MM/dd");

  console.log(text.includes("조한성"), "data");

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
  };
  return (
    <View>
      <Button title="약 봉투를 찍어주세요!" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
      )}
    </View>
  );
}
export default ImagePickerComponent;
