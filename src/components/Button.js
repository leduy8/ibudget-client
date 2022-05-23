import { grey3, grey1 } from "../configs/colors";
import react from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export default function Button(props) {
  const { onPress, iconName, buttonName } = props;
  return (
    <TouchableOpacity style={styles.v_account_item} onPress={onPress}>
      <Image style={styles.icon} source={iconName} />
      <Text style={styles.txt_account_item}>{buttonName}</Text>
      <Image
        style={[styles.icon, styles.margin_right]}
        source={require("../assets/icons/ic_arrow_right.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  v_account_item: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: grey3,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  txt_account_item: {
    fontSize: 15,
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    resizeMode: 'contain'
    // tintColor: grey1,
  },

  margin_right: { position: "absolute", right: 0, tintColor: grey3 },
});
