import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform } from "react-native";
// const RESULTS = {
//   UNAVAILABLE: "This feature is not available",
//   DENIED: "The permission has not been requested / is denied but requestable",
//   GRANTED: "The permission is granted",
//   LIMITED: "The permission is granted but with limitations",
//   BLOCKED: "The permission is denied and not requestable anymore",
// };
const androidPermissions = {
  notification: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
  camera: PERMISSIONS.ANDROID.CAMERA,
  photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};
const iosPermissions = {
  location: PERMISSIONS.IOS.REMINDERS,
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
};
const permissionsPerOS = androidPermissions;

const getPermission = async (
  [permission],
  onSuccess,
  onFailed,
  essential = false
) => {
  const needPermission = permissionsPerOS[permission];
  permissionModalStore.setMessage(PERMISSION_REQUEST_MESSAGE[permission]);
  permissionModalStore.setOpen(true);

  const handlePermissionSuccess = () => {
    if (onSuccess) onSuccess();
    permissionModalStore.setOpen(false);
    permissionModalStore.setMessage("");
    return true;
  };

  const handlePermissionError = (message, openSetting = false) => {
    if (openSetting) goToSettings(message);
    if (onFailed) onFailed();
    permissionModalStore.setOpen(false);
    permissionModalStore.setMessage("");
    return false;
  };

  let requested;
  const checked = await check(needPermission);
  switch (checked) {
    case RESULTS.UNAVAILABLE:
      return handlePermissionError(strings.PERMISSION_UNAVAILABLE, essential);
    case RESULTS.GRANTED:
      return handlePermissionSuccess();
    case RESULTS.DENIED:
      requested = await request(needPermission);
      if (requested === RESULTS.GRANTED) {
        return handlePermissionSuccess();
      }
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
    default:
      return handlePermissionError(strings.PERMISSION_BLOCKED, essential);
  }
};
const getPermissions = async (
  [permissions],
  onSuccess,
  onFailed,
  essential = false
) => {
  const permissionsResult = permissions.reduce(
    async (previousPermission, currentPermission) => {
      const previousPermissionResult = await previousPermission;
      const currentPermissionResult = await getPermission(currentPermission);
      previousPermissionResult.push(currentPermissionResult);
      return previousPermissionResult;
    },
    Promise.resolve([])
  );

  permissionsResult.then((result) => {
    if (result.every(Boolean) && onSuccess) onSuccess();
    if (!result.every(Boolean) && onFailed) {
      if (essential) goToSettings(strings.PERMISSION_BLOCKED);
      onFailed();
    }
  });
};
