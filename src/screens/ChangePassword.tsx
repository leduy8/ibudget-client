import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { grey3, mainColor, placeholderTextColor } from "../configs/colors";
import { TextInput } from "react-native-gesture-handler";
import { changePassword } from "../services/password";
import Button from "../components/Button";
import AlertPopUp from "../components/AlertPopUp";

const ChangePassword = (props) => {
  const { token } = useSelector((state: any) => state.tokenState);
  const { navigate } = useNavigation();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(true);

  const onChangePassword = async () => {
    try {
      await changePassword({ password: password }, token);
      console.log(token);
      AlertPopUp("", "Password changed successfully!");
      setPassword("");
      setPassword2("");
      navigate(Routes.Account);
    } catch (error) {
      AlertPopUp("", "Something's wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff" }}>
        <View style={styles.v_header}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Change Password
          </Text>
          <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
            <TouchableOpacity
              style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
              onPress={() => navigate(Routes.AccountDetails)}
            >
              <Image
                style={styles.icon}
                source={require("../assets/icons/ic_arrow_left.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textInput}>
          <TextInput
            style={styles.inputField}
            onChangeText={setPassword}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={visiblePassword}
            placeholder={"New password"}
            value={password}
          />
          <TouchableOpacity
            style={styles.showPasswordIcon}
            onPress={() => setVisiblePassword(!visiblePassword)}
          >
            {visiblePassword ? (
              <Image
                source={require("../assets/icons/ic_eye.png")}
                style={styles.icon}
              />
            ) : (
              <Image
                source={require("../assets/icons/ic_eye_off.png")}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.textInput}>
          <TextInput
            style={styles.inputField}
            onChangeText={setPassword2}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={visibleConfirmPassword}
            placeholder={"Confirm password"}
            value={password2}
          />
          <TouchableOpacity
            style={styles.showPasswordIcon}
            onPress={() => {
              setVisibleConfirmPassword(!visibleConfirmPassword);
            }}
          >
            {visibleConfirmPassword ? (
              <Image
                source={require("../assets/icons/ic_eye.png")}
                style={styles.icon}
              ></Image>
            ) : (
              <Image
                source={require("../assets/icons/ic_eye_off.png")}
                style={styles.icon}
              ></Image>
            )}
          </TouchableOpacity>
        </View>

        <Button
          customStylesContainer={{
            backgroundColor: mainColor,
            justifyContent: "center",
          }}
          customStylesText={{
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "700",
          }}
          buttonName={"Change password"}
          onPress={() => {
            if (password !== password2)
              AlertPopUp(
                "Invalid input",
                "Password and confirm password must be match."
              );
            else onChangePassword();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  v_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: grey3,
    marginBottom: 10,
  },

  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },

  textInput: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    paddingVertical: 20,
    color: placeholderTextColor,
    height: 40,
    alignItems: "center",
    marginHorizontal: 40,
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: "row",
  },

  inputField: {
    height: 42,
    flex: 9,
    paddingRight: 20,
  },

  showPasswordIcon: {
    flex: 1,
  },
});

export default ChangePassword;
