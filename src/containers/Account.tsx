import { useNavigation } from "@react-navigation/native";
import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { grey1, grey2, grey3, mainColor } from "../configs/colors";
import Routes from "../configs/routes";
import { textContent } from "../configs/textContent";
import Button from "../components/Button";
import { deleteToken } from "../redux/actions/tokenAction";
import { useSelector } from 'react-redux';

const Bt_upgrade = () => {
  return (
    <View>
      <ImageBackground
        style={styles.v_upgrade}
        source={require("../assets/icons/banner_background.png")}
      >
        <Text style={{ color: "#fff", fontSize: 15, marginBottom: 20 }}>
          {textContent.ACCOUNT.UPGRADE}
        </Text>

        <View style={styles.bt_upgrade}>
          <Text style={{ color: mainColor }}>VIEW UPGRADE OPTIONS</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const Account = () => {
  const { navigate } = useNavigation();
  const {user} = useSelector((state: any) => state.userState)

  const getName = (name: any) => {
    if (name != undefined && name != null && name != {}) {
      var values = name.split(" ");
      var letter = values[values.length - 1].charAt(0);
      return letter;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.v_account_detail}>
          <View style={styles.v_avatar}>
            <Text style={{fontSize: 40, color: '#FFF', fontWeight: 'bold'}}>{getName(user?.name)}</Text>
          </View>
          <Text style={styles.txt_username}>{user?.name}</Text>
        </View>

        <Button
          iconName={require("../assets/icons/ic_user.png")}
          buttonName={textContent.ACCOUNT.MY_ACCOUNT}
        />

        <Bt_upgrade />

        <Button
          iconName={require("../assets/icons/ic_wallet.png")}
          buttonName={textContent.ACCOUNT.MY_WALLET}
          onPress={() => navigate(Routes.WalletList)}
        />
        <Button
          iconName={require("../assets/icons/ic_debt.png")}
          buttonName={textContent.ACCOUNT.DEBTS}
        />
        <Button
          iconName={require("../assets/icons/ic_loan.png")}
          buttonName={textContent.ACCOUNT.LOANS}
        />
        <Button
          iconName={require("../assets/icons/ic_ask.png")}
          buttonName={textContent.ACCOUNT.HELP_SUPPORT}
        />
        <Button
          iconName={require("../assets/icons/ic_about.png")}
          buttonName={textContent.ACCOUNT.ABOUT}
        />
        <Button
          iconName={require("../assets/icons/ic_settings.png")}
          buttonName={textContent.ACCOUNT.SETTING}
        />
        <Button
          iconName={require("../assets/icons/ic_log_out.png")}
          buttonName={textContent.ACCOUNT.LOG_OUT}
          onPress={() => deleteToken()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  v_header: {
    marginTop: 50,
    paddingLeft: 15,
    paddingBottom: 5,
    borderBottomWidth: 0.2,
    borderBottomColor: grey3,
  },

  v_account_detail: {
    paddingHorizontal: 15,
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: grey3,
    backgroundColor: "#fff",
  },

  v_avatar: {
    height: 60,
    width: 60,
    backgroundColor: "purple",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  txt_username: {
    paddingTop: 15,
    fontSize: 15,
  },
  txt_email: {
    fontSize: 13,
    marginTop: 5,
    color: grey1,
  },

  v_my_account: {
    paddingVertical: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: grey1,
  },

  txt_account_item: {
    fontSize: 15,
  },

  v_upgrade: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
  },

  bt_upgrade: {
    height: 40,
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

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

  margin_right: { position: "absolute", right: 0, tintColor: grey3 },
});
