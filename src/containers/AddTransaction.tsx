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
  ScrollView,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { grey3, placeholderTextColor, happy, frown } from "../configs/colors";
import Routes from "../configs/routes";
import { getCategories } from "../services/category";
import { createTransaction } from "../services/transaction";
import { getWalletById, transactInWallet } from "../services/wallet";
import { getDateJsonFormat, toDisplayDate } from "../ultils/date";
import { categoryIconsMapper, formatCurrency } from "../ultils/string";
import { setUpdateSignal } from './../redux/actions/updateSignalAction';
import AlertPopUp from './../components/AlertPopUp';

const AddTransaction = () => {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);
  const { walletList } = useSelector((state: any) => state.walletListState);
  const { focusWallet } = useSelector((state: any) => state.focusWalletState);
  const [money, setMoney] = useState<any>(0);
  const [categories, setCategories] = useState<any>();
  const [focusCategory, setFocusCategory] = useState<any>({});
  const [focusCategoryIcon, setFocusCategoryIcon] = useState<any>();
  const [note, setNote] = useState("");
  const [datePicked, setDatePicked] = useState(getDateJsonFormat(new Date().toISOString()));
  const [walletPicked, setWalletPicked] = useState<any>(focusWallet);
  const [categoryModalVisible, setCategoryModalVisible] = useState<any>(false);
  const [datetimePickerModalVisible, setDatetimePickerModalVisible] = useState<any>(false);
  const [walletModalVisible, setWalletModalVisible] = useState<any>(false);
  const [transactionStatus, setTransactionStatus] = useState(0);

  const onGetCategories = async () => {
    const temp: any = await getCategories(token);
    if (temp?.categories) {
      temp.categories.shift();
      setCategories(temp);
    }
  };

  const onToggleDatetimePicker = () => {
    setDatetimePickerModalVisible(!datetimePickerModalVisible);
  }

  const onHandleDatetimePicked = date => {
    setDatePicked(getDateJsonFormat(JSON.stringify(date).split("\"")[1]));
    setDatetimePickerModalVisible(false);
  };

  const onGetWalletById = async (id) => {
    const temp: any = await getWalletById(token, id);
    setWalletPicked(temp);
    setWalletModalVisible(!walletModalVisible);
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Add Transactions
        </Text>
        <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
            onPress={() => navigate(Routes.Transactions)}
          >
            <Image
              style={styles.iconHeader}
              source={require("../assets/icons/ic_arrow_left.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ position: "absolute", right: 0, paddingRight: 15 }} onPress={async () => {
          let transaction = {
            "price": focusCategory.type === "Expense" ? money * -1 : money,
            "note": note,
            "created_date": datePicked,
            "category_id": focusCategory.id,
            "wallet_id": walletPicked.id,
          };

          if (transactionStatus === 1) transaction["is_positive"] = true;
          else if (transactionStatus === 2) transaction["is_positive"] = false;

          const returnedWalletAfterTransaction: any = await transactInWallet(token, transaction, walletPicked.id);
          if (returnedWalletAfterTransaction.error_message) {
            return AlertPopUp("Something went wrong", returnedWalletAfterTransaction.error_message);
          }
          const returnedTransaction: any = await createTransaction(transaction, token);
          if (returnedTransaction.error_message) {
            return AlertPopUp("Something went wrong", returnedTransaction.error_message);
          }
          setUpdateSignal(true);
          navigate(Routes.Transactions);
          setMoney(0);
          setNote("");
          setDatePicked(getDateJsonFormat(new Date().toISOString()));
          setWalletPicked(focusWallet);
          setTransactionStatus(0);
        }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.v_add_content}>
        <View>
          <Text style={{ paddingLeft: "10%", marginTop: 10, marginLeft: 20 }}>
            Amount
          </Text>
          <View style={styles.v_money}>
            <View style={styles.bt_money}>
              <Text style={{ fontSize: 35, color: focusCategory.type === "Expense" ? frown : happy }}>{focusCategory.type === "Expense" ? "-" : "+"}</Text>
            </View>
            <View style={styles.v_input_money}>
              <TextInput
                style={[styles.txt_input_money, { color: focusCategory.type === "Expense" ? frown : happy }]}
                keyboardType="numeric"
                value={money.toString()}
                onChangeText={setMoney}
                maxLength={10}
              />
              <Text style={{ fontSize: 40, marginLeft: 5, color: focusCategory.type === "Expense" ? frown : happy }}>đ</Text>
            </View>
          </View>
        </View>

        <Button
          buttonName={focusCategory?.name}
          iconName={categoryIconsMapper[focusCategoryIcon] || require("../assets/icons/ic_category.png")}
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}
        />

        <View style={styles.noteInputContainer}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/ic_notes.png")}
          />
          <TextInput
            style={{ fontSize: 15, marginLeft: 10 }}
            multiline={true}
            value={note}
            placeholder={"Write your note"}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(text) => setNote(text)}
            maxLength={200}
          />
        </View>
        <Button
          buttonName={toDisplayDate(datePicked)}
          iconName={require("../assets/icons/ic_planning.png")}
          onPress={() => { onToggleDatetimePicker() }}
        />
        <Button
          buttonName={walletPicked ? walletPicked.name : "Choose your wallet"}
          iconName={require("../assets/icons/ic_color_wallet.png")}
          onPress={() => { setWalletModalVisible(true) }}
        />
        <View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
            <Text style={{ fontSize: 15 }}>Is this a positive transaction?</Text>
          </View>
          <View style={styles.statusIconContainer}>
            <TouchableWithoutFeedback onPress={() => setTransactionStatus(2)}>
              <Icon name={"frown-o"} size={100} color={transactionStatus === 2 ? frown : "#000"} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setTransactionStatus(1)}>
              <Icon name={"smile-o"} size={100} color={transactionStatus === 1 ? happy : "#000"} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          setCategoryModalVisible(!categoryModalVisible);
        }}
      >
        <View style={styles.container}>
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
              onPress={() => setCategoryModalVisible(false)}
            >
              Close
            </Text>
            <Text>Select Category</Text>
          </View>
          <ScrollView>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginVertical: 20,
                  color: frown,
                }}
              >
                Expenses
              </Text>
              {categories?.categories.map((item, index) => {
                if (item.type === "Expense") {
                  return (
                    (
                      <TouchableOpacity
                        onPress={() => {
                          setFocusCategory(item);
                          setFocusCategoryIcon(item.icon_name);
                          setCategoryModalVisible(!categoryModalVisible);
                        }}
                        key={index}
                        style={{
                          paddingVertical: 15,
                          backgroundColor: "#fff",
                          paddingHorizontal: 20,
                          borderBottomWidth: 1,
                          borderBottomColor: grey3,
                        }}
                      >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            style={[styles.icon, { marginRight: 10 }]}
                            source={categoryIconsMapper[item.icon_name]}
                          />
                          <Text>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  );
                }
              })}
              <Text style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 15,
                marginVertical: 20,
                color: happy,
              }}>
                Incomes
              </Text>
              {categories?.categories.map((item, index) => {
                if (item.type === "Income") {
                  return (
                    (
                      <TouchableOpacity
                        onPress={() => {
                          setFocusCategory(item);
                          setFocusCategoryIcon(item.icon_name);
                          setCategoryModalVisible(!categoryModalVisible);
                        }}
                        key={index}
                        style={{
                          paddingVertical: 15,
                          backgroundColor: "#fff",
                          paddingHorizontal: 20,
                          borderBottomWidth: 1,
                          borderBottomColor: grey3,
                        }}
                      >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Image
                            style={[styles.icon, { marginRight: 10 }]}
                            source={categoryIconsMapper[item.icon_name]}
                          />
                          <Text>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                  );
                }
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <DateTimePicker
        isVisible={datetimePickerModalVisible}
        onConfirm={onHandleDatetimePicked}
        onCancel={onToggleDatetimePicker}
        mode="date"
        locale="vi"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={walletModalVisible}
        onRequestClose={() => {
          setWalletModalVisible(!walletModalVisible);
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
              onPress={() => setWalletModalVisible(false)}
            >
              Close
            </Text>
            <Text>Select Wallet</Text>
          </View>

          <View>
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
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default AddTransaction;

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
    marginBottom: 30,
  },

  v_add_content: {
    backgroundColor: "#fff",
    width: "100%",
  },

  v_money: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  bt_money: {
    alignItems: "center",
    flex: 0.1,
  },

  v_input_money: {
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: -8,
    flex: 0.9,
  },
  txt_input_money: {
    fontSize: 40,
  },

  v_category: {
    flexDirection: "row",
  },

  iconHeader: {
    height: 15,
    width: 15,
    resizeMode: "contain"
  },

  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },

  margin_right: {
    position: "absolute",
    right: 0,
    tintColor: grey3
  },

  noteInputContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: grey3,
    paddingVertical: 15,
    alignItems: "center",
  },

  statusIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  }
});
