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
import DateTimePicker from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { grey1, grey3 } from "../configs/colors";
import Routes from "../configs/routes";
import { getCategories } from "../services/category";
import { getWalletById } from "../services/wallet";
import { getDateJsonFormat, toDisplayDate } from "../ultils/date";
import { categoryIconsMapper, formatCurrency } from "../ultils/string";

const AddTransaction = () => {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);
  const { walletList } = useSelector((state: any) => state.walletListState);
  const [money, setMoney] = useState<any>(0);
  const [categories, setCategories] = useState<any>();
  const [focusCategory, setFocusCategory] = useState<any>(categories);
  const [focusCategoryIcon, setFocusCategoryIcon] = useState<any>();
  const [note, setNote] = useState("");
  const [datePicked, setDatePicked] = useState(getDateJsonFormat(new Date().toISOString()));
  const [walletPicked, setWalletPicked] = useState<any>();
  const [categoryModalVisible, setCategoryModalVisible] = useState<any>(false);
  const [datetimePickerModalVisible, setDatetimePickerModalVisible] = useState<any>(false);
  const [walletModalVisible, setWalletModalVisible] = useState<any>(false);

  const onGetCategories = async () => {
    const temp = await getCategories(token);
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
              style={styles.icon}
              source={require("../assets/icons/ic_arrow_left.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ position: "absolute", right: 0, paddingRight: 15 }}>
          Save
        </Text>
      </View>

      <View style={styles.v_add_content}>
        <View>
          <Text style={{ paddingLeft: "10%", marginTop: 10, marginLeft: 20 }}>
            Amount
          </Text>
          <View style={styles.v_money}>
            <View style={styles.bt_money}>
              <Text>VND</Text>
            </View>
            <View style={styles.v_input_money}>
              <TextInput
                style={styles.txt_input_money}
                keyboardType="numeric"
                value={money.toString()}
                onChangeText={setMoney}
              />
            </View>
          </View>
        </View>

        <Button
          buttonName={focusCategory?.name}
          iconName={categoryIconsMapper[focusCategoryIcon] || require("../assets/icons/ic_category.png")}
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}
        />

        <Button
          buttonName="Note"
          iconName={require("../assets/icons/ic_notes.png")}
        />
        <Button
          buttonName={toDisplayDate(datePicked)}
          iconName={require("../assets/icons/ic_planning.png")}
          onPress={() => {onToggleDatetimePicker()}}
        />
        <Button
          buttonName={walletPicked ? walletPicked.name : "Cash"}
          iconName={require("../assets/icons/ic_color_wallet.png")}
          onPress={() => {setWalletModalVisible(true)}}
        />
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
                }}
              >
                Expenses
              </Text>
              {categories?.categories.map((item, index) => (
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
                  <View style={{display: "flex", flexDirection: "row"}}>
                    <Image
                      style={[styles.iconCategoryModal, { marginRight: 10 }]}
                      source={categoryIconsMapper[item.icon_name]}
                    />
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <Text>Incomes</Text>
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
        <ScrollView style={{ flex: 1, backgroundColor: "#F5F5F5", marginTop: Platform.OS === "ios" ? 16 : 0}}>
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: grey3,
    alignItems: "center",
    flex: 0.1,
  },

  v_input_money: {
    marginLeft: 15,
    paddingBottom: 10,
    marginBottom: -8,
    flex: 0.9,
    justifyContent: "center",
  },
  txt_input_money: {
    fontSize: 40,
  },

  v_category: {
    flexDirection: "row",
  },

  icon: { 
    height: 15, 
    width: 15, 
    resizeMode: "contain" 
  },

  iconCategoryModal: { 
    height: 20, 
    width: 20, 
    resizeMode: "contain" 
  },

  margin_right: { position: "absolute", right: 0, tintColor: grey3 },
});
