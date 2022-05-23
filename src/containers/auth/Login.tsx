import { useNavigation } from "@react-navigation/native";
import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import Loading from "../../components/Loading";
import Routes from "../../configs/routes";
import { textContent } from "../../configs/textContent";
import { setToken } from "../../redux/actions/tokenAction";
import { setUser } from "../../redux/actions/userAction";
import { login } from "../../services/auth";
import { getUser } from "./../../services/auth";
import { useSelector } from "react-redux";

const Login = () => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [validateLogin, setValidateRegister] = useState({
    status: false,
    mes: "",
  });
  const [turnOnLoading, setTurnOnLoading] = useState(false);

  const onLogin = async () => {
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

    if (!validateLogin.status) {
      const data: any = await login({
        username: username,
        password: password,
      });
      if (data?.access_token) {
        setToken(data.access_token);
        const userData: any = await getUser(data.access_token);
        if (!userData?.error_message) {
          setUser(userData);
        }
      } else if (data?.error_message) {
        setTurnOnLoading(false);
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
      {turnOnLoading ? <Loading></Loading> : null}

      <Text style={styles.txt_header}>Login</Text>

      <View style={styles.textInput}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor="#707070"
          placeholder={textContent.SIGNIN_SIGNUP.USERNAME}
          value={username}
          onChangeText={(text) => setUsername(text)}
        ></TextInput>
      </View>

      <View style={styles.textInput}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor="#707070"
          secureTextEntry={visiblePassword}
          placeholder={textContent.SIGNIN_SIGNUP.PASSWORD}
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
                source={require("../../assets/icons/ic_eye.png")}
                style={styles.icon}
              ></Image>
            ) : (
              <Image
                source={require("../../assets/icons/ic_eye_off.png")}
                style={styles.icon}
              ></Image>
            )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bt_login} onPress={() => onLogin()}>
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
          Login
        </Text>
      </TouchableOpacity>

      <Text
        style={[styles.txt_register, { textAlign: "center" }]}
        onPress={() => navigate(Routes.Register)}
      >
        Register
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
              source={require("../../assets/icons/ic_warning.png")}
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

export default Login;

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
    color: "#707070",
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
    backgroundColor: "#2DB84C",
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
    color: "#2DB84C",
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
    // justifyContent: 'center',
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
