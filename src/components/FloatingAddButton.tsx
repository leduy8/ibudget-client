import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { mainColor } from "../configs/colors";

const FloatingAddButton = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require("../assets/icons/ic_plus.png")}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: mainColor,
    borderRadius: 100,
  },

  icon: {
    height: 20,
    width: 20,
    tintColor: "#fff",
  },
});

export default FloatingAddButton;
