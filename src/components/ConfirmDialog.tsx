import { Alert } from "react-native";

export default function ConfirmDialog(
  onPress,
  mainHeadline,
  subHeadline,
  ...onPressParams
) {
  return Alert.alert(mainHeadline, subHeadline, [
    // The "Yes" button
    {
      text: "Yes",
      onPress: () => onPress(...onPressParams),
    },
    // The "No" button
    // Does nothing but dismiss the dialog when tapped
    {
      text: "No",
    },
  ]);
}
