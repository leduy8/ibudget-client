import { useNavigation } from "@react-navigation/native";
import React, { memo, useState, useCallback, useEffect, useRef } from "react";
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
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Border } from "victory-native";
import Button from "../components/Button";
import { grey3, mainColor } from "../configs/colors";
import { windowWidth } from "../configs/constants";
import { textContent } from "../configs/textContent";
import { createWallet, getWallets, getWalletsById } from "../services/common";

const month = [
  {
    id: 1,
    title: "12/2021",
  },
  {
    id: 2,
    title: "01/2022",
  },
  {
    id: 3,
    title: "02/2022",
  },
  {
    id: 4,
    title: "LAST MONTH",
  },
  {
    id: 5,
    title: "THIS MONTH",
  },
  {
    id: 6,
    title: "FUTURE",
  },
];

const Header = (props) => {
  const { onPress, balance } = props;

  return (
    <View style={styles.v_header}>
      <View style={styles.v_wallet}>
        <TouchableOpacity
          style={{ backgroundColor: "#364E5C", padding: 8, borderRadius: 30 }}
          onPress={onPress}
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
      <View style={styles.v_header_balance}>
        <Text
          style={{
            color: "#C2C2C2",
            fontSize: 12,
            textAlignVertical: "center",
          }}
        >
          {textContent.TRANSACTIONS.CASH}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
            textAlignVertical: "center",
          }}
        >
          {balance} đ
        </Text>
      </View>

      <View style={styles.v_noti}>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../assets/icons/ic_bell.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 15 }}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/ic_three_dots.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Transactions = () => {
  let myList = useRef();

  const [selected, setSelected] = useState<any>(4);
  const [modalVisiable, setmodalVisiable] = useState<any>(false);
  const { token } = useSelector((state: any) => state.tokenState);
  const [wallet_data, set_wallet_data] = useState<any>([]);
  const [wallet, set_wallet] = useState<any>({});
  const [toggleAddWallet, setToggleAddWallet] = useState<any>(false);
  const [walletName, setWalletName] = useState<any>();
  const [walletBalence, setWalletBalence] = useState<any>();
  const [totalBalance, setTotalBalance] = useState<any>(0);
  const [focusWallet, setfocusWallet] = useState<any>(1);

  const onGetWallet = async () => {
    let totalBalenceTemp = 0;
    const walletData = await getWallets(token);
    set_wallet_data(walletData);
    for (let i = 0; i < walletData?.wallets.length; i++) {
      totalBalenceTemp = totalBalenceTemp + walletData.wallets[i].balance;
    }
    setTotalBalance(totalBalenceTemp);
  };

  const onGetWalletById = async (id) => {
    const walletData = await getWalletsById(token, id);
    set_wallet(walletData);
    setmodalVisiable(!modalVisiable);
  };

  const onCreateWallet = async () => {
    const walletData = await createWallet(
      { name: walletName, balance: walletBalence },
      token
    );
    if (walletData) {
      onGetWallet();
      setToggleAddWallet(!toggleAddWallet);
    }
  };

  useEffect(() => {
    onGetWallet();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.v_monthItem}
      onPress={() => {
        myList.current.scrollToIndex({
          animated: true,
          index: month.indexOf(item) === 0 ? 0 : month.indexOf(item) - 1,
        });
        setSelected(month.indexOf(item));
      }}
    >
      <Text
        style={[
          { fontSize: 15, color: "#BDBDBD" },
          selected === month.indexOf(item) && { color: "#000" },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => setmodalVisiable(!modalVisiable)}
        balance={wallet.balance}
      />
      <View style={styles.v_month_container}>
        <FlatList
          data={month}
          ref={myList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          initialScrollIndex={4}
          onScrollToIndexFailed={(item) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              myList.current?.scrollToIndex({
                index: month.indexOf(item),
                animated: true,
              });
            });
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.v_count_balance}>
          <View style={[styles.v_balance, { marginBottom: 10 }]}>
            <Text>Openning balance</Text>
            <Text style={{ position: "absolute", right: 15 }}>$ 0.00</Text>
          </View>
          <View style={styles.v_balance}>
            <Text>Ending balance</Text>
            <Text style={{ position: "absolute", right: 15 }}>
              -$ 58,000.00
            </Text>
          </View>
          <View style={styles.v_result}>
            <Text>-$ 58,000.00</Text>
          </View>

          <Text
            style={{ textAlign: "center", color: mainColor, marginTop: 5 }}
          >
            View report for this period
          </Text>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiable}
        onRequestClose={() => {
          setmodalVisiable(!modalVisiable);
        }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 10,
              borderBottomWidth: 0.2,
              paddingBottom: 10,
              borderColor: "#F5F5F5",
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{ position: "absolute", left: 12, top: 10 }}
              onPress={() => setmodalVisiable(false)}
            >
              Close
            </Text>
            <Text>Select Wallet</Text>
            <Text style={{ position: "absolute", right: 12, top: 10 }}>
              Edit
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              marginTop: 30,
              paddingVertical: 10,
              marginBottom: 30,
            }}
          >
            <Image
              style={{ height: 40, width: 40, marginRight: 20 }}
              source={require("../assets/icons/ic_global.png")}
            />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
              <Text>{totalBalance} đ</Text>
            </View>
          </View>

          <Text style={{ marginBottom: 10, marginLeft: 15 }}>
            INCLUDED IN TOTAL
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Image
              style={{ height: 40, width: 40, marginRight: 20 }}
              source={require("../assets/icons/ic_color_wallet.png")}
            />
            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Total</Text>
              <Text>{totalBalance} đ</Text>
            </View>
          </View>

          <View style={{ paddingTop: 20 }}>
            <Button
              iconName={require("../assets/icons/ic_add.png")}
              buttonName={"Add wallet"}
              onPress={() => setToggleAddWallet(!toggleAddWallet)}
            />
            {toggleAddWallet ? (
              <View style={{ paddingBottom: 20 }}>
                <TextInput
                  style={styles.inputField}
                  placeholderTextColor="#707070"
                  placeholder={"Wallet name"}
                  value={walletName}
                  onChangeText={(text) => setWalletName(text)}
                ></TextInput>
                <TextInput
                  style={styles.inputField}
                  placeholderTextColor="#707070"
                  placeholder={"Balance"}
                  value={walletBalence}
                  onChangeText={(text) => setWalletBalence(text)}
                ></TextInput>

                <TouchableOpacity
                  onPress={() => {
                    onCreateWallet();
                  }}
                  style={{
                    backgroundColor: "#2DB84C",
                    padding: 10,
                    width: 100,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Create</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <Button
              iconName={require("../assets/icons/ic_link.png")}
              buttonName={"Link to services"}
            />
          </View>
          <View>
            <Text
              style={{
                marginTop: 20,
                marginLeft: 20,
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Your Wallet
            </Text>
            <View>
              {wallet_data?.wallets
                ? wallet_data?.wallets.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        onGetWalletById(item.id);
                      }}
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        marginBottom: 10,
                        paddingVertical: 20,
                        marginHorizontal: 15,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Text>{item.name}: </Text>
                      <Text>{item.balance}đ</Text>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  v_header: {
    // paddingTop: 10,
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  v_wallet: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  v_header_balance: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },

  v_noti: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  icon: { height: 22, width: 22, resizeMode: "contain" },

  v_monthItem: {
    width: windowWidth / 3,
    alignItems: "center",
    justifyContent: "center",
  },

  v_month_container: {
    height: 40,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#C2C2C2",
  },
  v_count_balance: {
    backgroundColor: "#fff",
    paddingVertical: 20,
  },

  v_balance: {
    flexDirection: "row",
    paddingHorizontal: 15,
  },

  v_result: {
    width: "30%",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginRight: 15,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: grey3,
  },

  inputField: {
    height: 42,
    width: "80%",
    paddingRight: 20,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
    paddingLeft: 20,
  },
});
