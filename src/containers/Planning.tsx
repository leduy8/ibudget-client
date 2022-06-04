import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { textContent } from "../configs/textContent";
import Button from "../components/Button";

const Header = () => {
  return (
    <View style={styles.v_header}>
      <View style={styles.v_wallet}>
        <TouchableOpacity
          style={{ backgroundColor: "#364E5C", padding: 8, borderRadius: 30 }}
        >
          <Image
            style={styles.icon}
            source={require("../assets/icons/ic_color_wallet.png")}
          />
        </TouchableOpacity>
        <Image
          style={{
            height: 12,
            width: 12,
            resizeMode: "contain",
            marginLeft: 8,
            tintColor: "#C2C2C2",
          }}
          source={require("../assets/icons/ic_down_arrow.png")}
        />
      </View>
    </View>
  );
};

const Planning = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View style={[styles.v_header_name, { marginBottom: 30 }]}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {textContent.PLANNING.PLANNING}
          </Text>
        </View>

        <Button
          iconName={require("../assets/icons/ic_planning.png")}
          buttonName={textContent.PLANNING.BUDGETS}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Planning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  v_header: {
    backgroundColor: "#F2F2F2",
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
    justifyContent: "center",
  },

  v_wallet: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  icon: {
    height: 17,
    width: 17,
    resizeMode: "contain"
  },

  v_header_name: {
    paddingHorizontal: 15
  },
});
