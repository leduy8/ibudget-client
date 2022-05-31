import { Alert } from "react-native";

const AlertPopUp = (title="", message=null) => {
    if (!message) return Alert.alert(title);
    else if (!title || title === "") return Alert.alert("", message);
    return Alert.alert(title, message)
}

export default AlertPopUp;