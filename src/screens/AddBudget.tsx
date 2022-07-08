import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { frown, grey1, grey3, happy, neutral } from "../configs/colors";
import { statusBarHeight } from "../configs/app";
import { getPlanningDates, toDisplayDate } from "../ultils/date";
import { getCategories } from "../services/category";
import { getWalletById, getWallets } from "../services/wallet";
import { setFocusWallet } from "../redux/actions/focusWalletAction";
import { setWalletList } from "../redux/actions/walletListAction";
import { createBudget } from "../services/budget";
import { formatCurrency } from "../ultils/string";
import { categoryIconsMapper } from "../ultils/mapper";
import { setUpdateSignal } from "../redux/actions/updateSignalAction";
import Button from "../components/Button";
import AlertPopUp from "../components/AlertPopUp";

const AddBudget = (props) => {
  const timeData = getPlanningDates();
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);
  const { focusWallet } = useSelector((state: any) => state.focusWalletState);
  const { walletList } = useSelector((state: any) => state.walletListState);
  const [goalValue, setGoalValue] = useState<any>(0);
  const [categories, setCategories] = useState<any>();
  const [focusCategory, setFocusCategory] = useState<any>({});
  const [focusCategoryIcon, setFocusCategoryIcon] = useState<any>();
  const [dateRangePicked, setDateRangePicked] = useState("Tháng này");
  const [fromDate, setFromDate] = useState(`${getPlanningDates()[0].fromDate}`);
  const [toDate, setToDate] = useState(`${getPlanningDates()[0].toDate}`);
  const [walletPicked, setWalletPicked] = useState<any>(focusWallet);
  const [categoryModalVisible, setCategoryModalVisible] = useState<any>(false);
  const [dateRangeModalVisible, setDateRangeModalVisible] =
    useState<any>(false);
  const [walletModalVisible, setWalletModalVisible] = useState<any>(false);

  const onGetCategories = async () => {
    const temp: any = await getCategories(token);
    setCategories(temp);
  };

  const onGetWalletById = async (id) => {
    const temp: any = await getWalletById(token, id);
    setWalletPicked(temp);
    setWalletModalVisible(!walletModalVisible);
  };

  const onUpdateFocusWallet = async () => {
    const temp: any = await getWalletById(token, focusWallet.id);
    setFocusWallet(temp);
  };

  const onUpdateWalletList = async () => {
    const temp: any = await getWallets(token);
    setWalletList(temp);
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Thêm kế hoạch mới
        </Text>
        <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
            onPress={() => navigate(Routes.BudgetList)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/icons/ic_arrow_left.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 0, paddingRight: 15 }}
          onPress={async () => {
            let budget = {
              title: dateRangePicked,
              goal_value: goalValue,
              from_date: fromDate,
              to_date: toDate,
              category_id: focusCategory.id,
              wallet_id: walletPicked.id,
            };

            const returnedBudget: any = await createBudget(budget, token);
            if (returnedBudget.error_message) {
              return AlertPopUp("Có lỗi xảy ra", returnedBudget.error_message);
            }
            onUpdateFocusWallet();
            onUpdateWalletList();
            setUpdateSignal(true);
            navigate(Routes.BudgetList);
            setGoalValue(0);
            setDateRangePicked("Tháng này");
            setFromDate(timeData[0].fromDate);
            setFromDate(timeData[0].toDate);
            setWalletPicked(focusWallet);
          }}
        >
          <Text>Lưu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.v_add_content}>
        <View>
          <Text style={{ paddingLeft: "10%", marginTop: 10, marginLeft: 20 }}>
            Số tiền mong muốn
          </Text>
          <View style={styles.v_money}>
            <View style={styles.bt_money}></View>
            <View style={styles.v_input_money}>
              <TextInput
                style={[styles.txt_input_money, { color: happy }]}
                keyboardType="numeric"
                value={goalValue.toString()}
                onChangeText={setGoalValue}
                maxLength={10}
              />
              <Text
                style={{
                  fontSize: 40,
                  marginLeft: 5,
                  color: happy,
                }}
              >
                đ
              </Text>
            </View>
          </View>
        </View>

        <Button
          buttonName={focusCategory?.name}
          iconName={
            categoryIconsMapper[focusCategoryIcon] ||
            require("../assets/icons/ic_category.png")
          }
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}
        />

        <Button
          buttonName={dateRangePicked}
          iconName={require("../assets/icons/ic_planning.png")}
          onPress={() => setDateRangeModalVisible(true)}
        />
        <Button
          buttonName={walletPicked ? walletPicked.name : "Choose your wallet"}
          iconName={require("../assets/icons/ic_color_wallet.png")}
          onPress={() => {
            setWalletModalVisible(true);
          }}
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
        <View
          style={[
            styles.container,
            { marginTop: Platform.OS === "ios" ? statusBarHeight : 0 },
          ]}
        >
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
              Đóng
            </Text>
            <Text>Chọn loại chi tiêu</Text>
          </View>
          <ScrollView>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginVertical: 20,
                  color: neutral,
                }}
              >
                Tất cả
              </Text>
              {categories?.categories.map((item, index) => {
                if (item.type === "All") {
                  return (
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
                  );
                }
              })}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginVertical: 20,
                  color: frown,
                }}
              >
                Chi tiêu
              </Text>
              {categories?.categories.map((item, index) => {
                if (item.type === "Expense") {
                  return (
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
                  );
                }
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={dateRangeModalVisible}
        onRequestClose={() => {
          setDateRangeModalVisible(!dateRangeModalVisible);
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modalViewContainer}>
            <Text
              style={{ position: "absolute", left: 0, paddingLeft: 15 }}
              onPress={() => setDateRangeModalVisible(false)}
            >
              Đóng
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Chọn khoảng thời gian
            </Text>
          </View>

          <ScrollView style={{ backgroundColor: "#fff", width: "100%" }}>
            {timeData.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setDateRangePicked(item.title);
                  setDateRangeModalVisible(false);
                  setFromDate(item.fromDate);
                  setToDate(item.toDate);
                }}
                key={item.id}
                style={styles.modalItem}
              >
                <Text style={{ color: "#000", fontSize: 17, marginBottom: 5 }}>
                  {item.title}
                </Text>
                <Text style={{ color: grey1 }}>
                  {toDisplayDate(item.fromDate)} - {toDisplayDate(item.toDate)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={walletModalVisible}
        onRequestClose={() => {
          setWalletModalVisible(!walletModalVisible);
        }}
      >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            marginTop: Platform.OS === "ios" ? statusBarHeight : 0,
          }}
        >
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
              Đóng
            </Text>
            <Text>Chọn ví</Text>
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

  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },

  modalViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: grey3,
  },

  modalItem: {
    width: "100%",
    justifyContent: "center",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: grey3,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default AddBudget;
