import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { mainColor, placeholderTextColor } from "../configs/colors";
import Routes from "../configs/routes";
import { reigster } from "../services/auth";

const Register = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [validateLogin, setValidateRegister] = useState({
    status: false,
    mes: "",
  });

  const onRegister = async () => {
    setValidateRegister({ status: false, mes: "" });
    if (
      username.trim() === null ||
      username.trim() === "" ||
      username.trim().length > 50
    ) {
      setValidateRegister({
        ...validateLogin,
        status: true,
        mes: "Invalid username",
      });
      return;
    }

    if (
      password.trim() === null ||
      password.trim() === "" ||
      password.trim().length > 32 ||
      password.trim().length < 6
    ) {
      setValidateRegister({
        ...validateLogin,
        status: true,
        mes: "Invalid password",
      });
      return;
    }

    if (name.trim() === null || name.trim() === "" || name.length < 2) {
      setValidateRegister({
        ...validateLogin,
        status: true,
        mes: "Invalid name",
      });
      return;
    }

    if (!validateLogin.status) {
      const data: any = await reigster({
        username: username,
        password: password,
        name: name,
      });
      console.log(data);
      if (data?.message === "User has been created successfully") {
        Alert.alert("User has created successfully");
        setUsername("");
        setPassword("");
        setName("");
        navigate(Routes.Login);
      } else if (data?.error_message) {
        setValidateRegister({
          ...validateLogin,
          status: true,
          mes: data.error_message,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt_header}>Đăng ký</Text>

      <View style={styles.textInput}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor={placeholderTextColor}
          placeholder={"Tên đăng nhập"}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
      </View>

      <View style={styles.textInput}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={visiblePassword}
          placeholder={"Mật khẩu"}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={styles.showPasswordIcon}
          onPress={() => {
            setVisiblePassword(!visiblePassword);
          }}
        >
          {visiblePassword ? (
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

      <View style={styles.textInput}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor={placeholderTextColor}
          placeholder={"Tên của bạn"}
          value={name}
          onChangeText={(text) => setName(text)}
        ></TextInput>
      </View>

      <TouchableOpacity style={styles.bt_login} onPress={() => onRegister()}>
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
          Đăng ký
        </Text>
      </TouchableOpacity>

      <Text
        style={[styles.txt_register, { textAlign: "center" }]}
        onPress={() => navigate(Routes.Login)}
      >
        Đăng nhập
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={validateLogin.status}
        onRequestClose={() => {
          setValidateRegister({ status: false, mes: "" });
        }}
      >
        <View style={styles.v_modalError}>
          <View style={styles.v_modelErrorField}>
            <Image
              source={require("../assets/icons/ic_warning.png")}
              style={styles.ic_warning}
            />
            <Text style={styles.txt_errorMes}>{validateLogin.mes}</Text>
            <TouchableOpacity
              onPress={() => setValidateRegister({ status: false, mes: "" })}
            >
              <Text style={styles.txt_hideModel}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFE",
    justifyContent: "center",
  },

  txt_header: {
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },

  inputField: {
    height: 42,
    flex: 9,
    paddingRight: 20,
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

  iconContainer: {
    flex: 1,
  },

  icon: {
    height: 20,
    width: 20,
    tintColor: "#A5A5A5",
  },

  showPasswordIcon: {
    flex: 1,
  },

  bt_login: {
    height: 40,
    marginHorizontal: 40,
    backgroundColor: mainColor,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  v_register: {
    flexDirection: "row",
    marginHorizontal: 40,
  },

  txt_register: {
    color: mainColor,
    fontSize: 15,
    fontWeight: "600",
  },

  v_modalError: {
    flex: 1,
    backgroundColor: "#000A",
    justifyContent: "center",
    alignItems: "center",
  },

  v_modelErrorField: {
    width: "70%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  ic_warning: {
    height: 30,
    width: 30,
    marginVertical: 20,
    alignSelf: "center",
  },

  txt_errorMes: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },

  txt_hideModel: {
    fontSize: 16,
    color: "#4080EF",
    fontWeight: "bold",
    marginVertical: 20,
    marginRight: 30,
    alignSelf: "flex-end",
  },
});
