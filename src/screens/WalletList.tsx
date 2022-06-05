import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { deleteWallet } from "../services/wallet";
import { grey3 } from "../configs/colors";
import { formatCurrency } from "../ultils/string";
import { setWalletList } from "../redux/actions/walletListAction";
import ConfirmDialog from "../components/ConfirmDialog";

const WalletList = (props) => {
  const { token } = useSelector((state: any) => state.tokenState);
  const { walletList } = useSelector((state: any) => state.walletListState);
  const { navigate } = useNavigation();

  const onDeleteWallet = (id) => {
    const temp = { ...walletList };
    temp.wallets = walletList.wallets.filter((wallet) => wallet.id !== id);
    setWalletList(temp);
    deleteWallet(token, id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Wallets</Text>
        <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
            onPress={() => navigate(Routes.Account)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/icons/ic_arrow_left.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {walletList?.wallets
          ? walletList?.wallets.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  marginBottom: 0,
                  paddingVertical: 15,
                  paddingHorizontal: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", width: "88%" }}>
                    <Image
                      style={{ height: 40, width: 40, marginRight: 20 }}
                      source={require("../assets/icons/ic_color_wallet.png")}
                    />

                    <View>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {item.name}
                      </Text>
                      <Text>{formatCurrency(item.balance)} đ</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      ConfirmDialog(
                        onDeleteWallet,
                        "Are you sure?",
                        "Are you sure that you want to delete this wallet?",
                        item.id
                      )
                    }
                  >
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={require("../assets/icons/ic_trash_bin_red.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          : null}
      </ScrollView>
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
    marginBottom: 20,
  },

  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },
});

export default WalletList;
