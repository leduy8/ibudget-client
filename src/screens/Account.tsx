import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import Routes from "../configs/routes";
import { grey1, grey3, mainColor } from "../configs/colors";
import { deleteToken } from "../redux/actions/tokenAction";
import { useSelector } from "react-redux";
import Button from "../components/Button";

const ButtonUpgrade = () => {
  return (
    <View>
      <ImageBackground
        style={styles.v_upgrade}
        source={require("../assets/icons/banner_background.png")}
      >
        <Text style={{ color: "#fff", fontSize: 15, marginBottom: 20 }}>
          Get the most out of this app. Upgrade now!
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
  const { user } = useSelector((state: any) => state.userState);

  const getAvatarInitial = (name: any) => {
    if (name != undefined && name != null && name != {}) {
      const values = name.split(" ");
      return values[values.length - 1].charAt(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.v_account_detail}>
          <View style={styles.v_avatar}>
            <Text style={{ fontSize: 40, color: "#FFF", fontWeight: "bold" }}>
              {getAvatarInitial(user?.name)}
            </Text>
          </View>
          <Text style={styles.txt_username}>{user?.name}</Text>
        </View>

        <Button
          iconName={require("../assets/icons/ic_user.png")}
          buttonName={"My Account"}
          onPress={() => navigate(Routes.AccountDetails)}
        />

        <ButtonUpgrade />

        <Button
          iconName={require("../assets/icons/ic_wallet.png")}
          buttonName={"My Wallets"}
          onPress={() => navigate(Routes.WalletList)}
        />
        <Button
          iconName={require("../assets/icons/ic_debt.png")}
          buttonName={"Debts"}
        />
        <Button
          iconName={require("../assets/icons/ic_loan.png")}
          buttonName={"Loans"}
        />
        <Button
          iconName={require("../assets/icons/ic_ask.png")}
          buttonName={"Help & Support"}
        />
        <Button
          iconName={require("../assets/icons/ic_about.png")}
          buttonName={"About"}
        />
        <Button
          iconName={require("../assets/icons/ic_settings.png")}
          buttonName={"Settings"}
        />
        <Button
          iconName={require("../assets/icons/ic_log_out.png")}
          buttonName={"Log Out"}
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
