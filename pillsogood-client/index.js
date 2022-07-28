import { registerRootComponent } from "expo";
import App from "./App";
import messaging from "@react-native-firebase/messaging";

messaging().setOpenSettingsForNotificationsHandler(async () => {
  //MMKV 패키지가 무엇일까..
  MMKV.setBool(openSettingsForNotifications, true);
});
registerRootComponent(App);
