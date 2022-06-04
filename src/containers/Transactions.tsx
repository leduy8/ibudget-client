import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text, Platform, SafeAreaView, ScrollView, FlatList, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Routes from './../configs/routes';
import { grey3, mainColor, placeholderTextColor } from "../configs/colors";
import { windowWidth } from "../configs/constants";
import { textContent } from "../configs/textContent";
import { setFocusWallet } from "../redux/actions/focusWalletAction";
import { setWalletList } from "../redux/actions/walletListAction";
import { createWallet, getWallets, getWalletById } from "../services/wallet";
import { formatCurrency } from "../ultils/string";
import { getTransactions } from './../services/transaction';
import { setUpdateSignal } from './../redux/actions/updateSignalAction';
import { getDateDetails } from "../ultils/date";
import { delay } from "../ultils/time";
import { setFocusTransaction } from './../redux/actions/focusTransactionAction';
import { categoryIconsMapper } from './../ultils/mapper';
import Button from "../components/Button";

const Header = (props) => {
  const { onPress, walletName, balance } = props;

  return (
    <SafeAreaView style={styles.v_header}>
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
        <Text style={{ color: "#C2C2C2", fontSize: 12, textAlignVertical: "center", }}>
          {walletName || textContent.TRANSACTIONS.CASH}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 17, textAlignVertical: "center", }}>
          {formatCurrency(balance) || 0} đ
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
    </SafeAreaView>
  );
};

const Transactions = () => {
  let myList: any = useRef();
  const { navigate } = useNavigation();

  const [selected, setSelected] = useState<any>(3);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const { token } = useSelector((state: any) => state.tokenState);
  const { dateRange } = useSelector((state: any) => state.dateRangeState);
  const { focusWallet } = useSelector((state: any) => state.focusWalletState);
  const { walletList } = useSelector((state: any) => state.walletListState);
  const { updateSignal } = useSelector((state: any) => state.updateSignalState);
  const [toggleAddWallet, setToggleAddWallet] = useState<any>(false);
  const [walletName, setWalletName] = useState<any>();
  const [walletBalance, setWalletBalance] = useState<any>();
  const [totalBalance, setTotalBalance] = useState<any>(0);
  const [transactionList, setTransactionList] = useState<any>({});
  const [transactionGroupByDate, setTransactionGroupByDate] = useState<any>([]);
  const [transactionDates, setTransactionDates] = useState<any>([]);
  const [inflow, setInflow] = useState(0);
  const [outflow, setOutflow] = useState(0);

  const onGetWallets = async () => {
    const walletData: any = await getWallets(token);
    setWalletList(walletData);
  };

  const onSetTotalBalance = () => {
    let totalBalanceTemp = 0;

    for (let i = 0; i < walletList.wallets.length; i++)
      totalBalanceTemp = totalBalanceTemp + walletList.wallets[i].balance;

    setTotalBalance(totalBalanceTemp);
  };

  const onGetWalletById = async (id) => {
    const temp: any = await getWalletById(token, id);
    setFocusWallet(temp);
    setModalVisible(!modalVisible);
  };

  const onCreateWallet = async () => {
    const walletData = await createWallet({ "name": walletName, "balance": walletBalance }, token);

    if (walletData) {
      onGetWallets();
      setToggleAddWallet(!toggleAddWallet);
    }
  };

  const onGetTransactions = async () => {
    const fromDate = dateRange[selected]["year"] + "-" + dateRange[selected]["month"] + "-" + dateRange[selected]["dayStart"];
    const toDate = dateRange[selected]["year"] + "-" + dateRange[selected]["month"] + "-" + dateRange[selected]["dayEnd"];
    const params = {
      "from_date": `${fromDate}`,
      "to_date": `${toDate}`,
      "title": `${dateRange[selected]["title"]}`,
      "wallet_id": `${focusWallet.id}`,
    };
    const temp: any = await getTransactions(token, params);

    if (temp && !temp.error_message) {
      setTransactionList({ ...temp });
      onUpdateInOutBalance(temp);
      onDistributeTransactionList(temp);
    } else {
      setTransactionGroupByDate([]);
      setTransactionDates([]);
      setInflow(0);
      setOutflow(-0);
    }
  };

  const onUpdateInOutBalance = (transactions) => {
    let tempInflow = 0;
    let tempOutflow = 0;

    transactions.transactions.map((transaction) => {
      if (transaction.category.type === "Expense")
        tempOutflow += transaction.price;
      else if (transaction.category.type === "Income")
        tempInflow += transaction.price;
    });

    setInflow(tempInflow);
    setOutflow(tempOutflow);
  };

  const onInOutDifferences = () => {
    return inflow + outflow;
  };

  const onDistributeTransactionList = (transactions) => {
    let temp: object = {};
    let tempTransactionGroupByDate: Array<any> = [];
    let tempTransactionDates: Array<any> = [];
    let index = -1;

    transactions.transactions.map((transaction, i) => {
      if (!(transaction.created_date in temp)) {
        temp[transaction.created_date] = "";
        tempTransactionDates.push(getDateDetails(transaction.created_date));
        tempTransactionGroupByDate.push([transaction]);
        index += 1;
      } else
        tempTransactionGroupByDate[index].push(transaction);
    });

    setTransactionGroupByDate([...tempTransactionGroupByDate]);
    setTransactionDates([...tempTransactionDates]);
  };

  useEffect(() => {
    onGetTransactions();
    setUpdateSignal(false);
  }, [updateSignal, selected, focusWallet]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.v_monthItem}
      onPress={() => {
        myList.current.scrollToIndex({
          animated: true,
          index: dateRange.indexOf(item) === 0 ? 0 : dateRange.indexOf(item) - 1,
        });
        setSelected(dateRange.indexOf(item));
      }}
    >
      <Text style={[{ fontSize: 15, color: "#BDBDBD" }, selected === dateRange.indexOf(item) && { color: "#000" }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => {
          setModalVisible(!modalVisible);
          onSetTotalBalance();
        }}
        balance={focusWallet.balance}
        walletName={focusWallet.name}
      />
      <View style={styles.v_month_container}>
        <FlatList
          data={dateRange}
          ref={myList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          initialScrollIndex={4}
          onScrollToIndexFailed={(item) => {
            delay(500).then(() => {
              myList.current?.scrollToIndex({
                index: dateRange.indexOf(item),
                animated: true,
              });
            });
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.v_count_balance}>
          <View style={[styles.v_balance, { marginBottom: 10 }]}>
            <Text>Inflow</Text>
            <Text style={{ position: "absolute", right: 15 }}>+{formatCurrency(inflow)} đ</Text>
          </View>
          <View style={styles.v_balance}>
            <Text>Outflow</Text>
            <Text style={{ position: "absolute", right: 15 }}>
              {formatCurrency(outflow)} đ
            </Text>
          </View>
          <View style={styles.v_result}>
            <Text>{formatCurrency(onInOutDifferences()) + " đ"}</Text>
          </View>

          <TouchableOpacity onPress={() => { navigate(Routes.Report) }}>
            <Text style={{ textAlign: "center", color: mainColor, marginTop: 5 }}>
              View report for this period
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10 }}>
          {(transactionGroupByDate.length > 0 && transactionDates.length > 0) ? transactionGroupByDate.map((transactionGroup, index) => {
            return (
              <View key={index} style={{ marginVertical: 10 }}>
                <View style={styles.transactionGroupDate}>
                  <Text style={styles.transactionGroupDay}>
                    {transactionDates[index].day}
                  </Text>
                  <View>
                    <Text>{transactionDates[index].weekday}</Text>
                    <Text>{transactionDates[index].month + " " + transactionDates[index].year}</Text>
                  </View>
                </View>

                {transactionGroup.map((transaction, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.transactionItem}
                      onPress={() => {
                        setFocusTransaction(transaction);
                        navigate(Routes.TransactionDetails);
                      }}
                    >
                      <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Image
                          style={{ height: 30, width: 30, marginRight: 20 }}
                          source={categoryIconsMapper[`${transaction.category.icon_name}`]}
                        />
                        <Text style={{ fontSize: 15 }}>{transaction.category.name}</Text>
                      </View>
                      <Text>{formatCurrency(transaction.price)} đ</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          }) : null}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5", marginTop: Platform.OS === "ios" ? 16 : 0 }}>
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
              onPress={() => setModalVisible(false)}
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
              <Text>{formatCurrency(totalBalance)} đ</Text>
            </View>
          </View>

          <View>
            <Text style={{ marginBottom: 10, marginLeft: 15 }}>
              INCLUDED IN TOTAL
            </Text>
            <View>
              {walletList?.wallets
                ? walletList?.wallets.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      onGetWalletById(item.id);
                    }}
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      marginBottom: 0,
                      paddingVertical: 15,
                      paddingHorizontal: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee"
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
                      <Image
                        style={{ height: 40, width: 40, marginRight: 20 }}
                        source={require("../assets/icons/ic_color_wallet.png")}
                      />
                      <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
                        <Text>{formatCurrency(item.balance)} đ</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
                : null}
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
                  placeholderTextColor={placeholderTextColor}
                  placeholder={"Wallet name"}
                  value={walletName}
                  onChangeText={(text) => setWalletName(text)}
                ></TextInput>
                <TextInput
                  style={styles.inputField}
                  placeholderTextColor={placeholderTextColor}
                  placeholder={"Balance"}
                  keyboardType="numeric"
                  value={walletBalance}
                  onChangeText={(text) => setWalletBalance(text)}
                ></TextInput>

                <TouchableOpacity
                  onPress={() => {
                    onCreateWallet();
                    onSetTotalBalance();
                    setWalletName("");
                    setWalletBalance("");
                  }}
                  style={{
                    backgroundColor: mainColor,
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

  icon: {
    height: 22,
    width: 22,
    resizeMode: "contain"
  },

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

  transactionGroupDate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: grey3,
    paddingVertical: 10,
  },

  transactionGroupDay: {
    fontSize: 35,
    fontWeight: "600",
    paddingLeft: 15,
    paddingRight: 15,
  },

  transactionItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  }
});
