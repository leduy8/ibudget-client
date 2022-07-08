import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { formatCurrency } from "../ultils/string";
import { getBudgets, deleteBudget } from "../services/budget";
import { getTransactions } from "../services/transaction";
import { grey3 } from "../configs/colors";
import { categoryIconsMapper } from "../ultils/mapper";
import { setUpdateSignal } from "../redux/actions/updateSignalAction";
import { checkDateInDateRange } from "../ultils/date";
import ConfirmDialog from "../components/ConfirmDialog";
import FloatingAddButton from "../components/FloatingAddButton";
import Loading from "../components/Loading";
import { delay } from "../ultils/time";

const BudgetList = (props) => {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);
  const { focusWallet } = useSelector((state: any) => state.focusWalletState);
  const { updateSignal } = useSelector((state: any) => state.updateSignalState);
  const [budgetList, setBudgetList]: any = useState({});
  const [transactionList, setTransactionList]: any = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const onGetBudgets = async () => {
    const temp: any = await getBudgets(token, { wallet_id: focusWallet.id });
    setBudgetList(temp);
  };

  const onDeleteBudget = async (id) => {
    const temp = { ...budgetList };
    temp.budgets = budgetList.budgets.filter((wallet) => wallet.id !== id);
    setBudgetList(temp);
    deleteBudget(token, id);
  };

  const onGetTransactions = async () => {
    const temp = await getTransactions(token, { wallet_id: focusWallet.id });
    setTransactionList(temp);
  };

  const getSpentBuget = (budget) => {
    let spent = 0;

    transactionList.transactions.map((transaction) => {
      if (transaction.category.type === "Expense") {
        if (
          checkDateInDateRange(
            budget.from_date,
            budget.to_date,
            transaction.created_date
          ) &&
          (budget.category.name === "Tất cả" ||
            transaction.category.name === budget.category.name)
        ) {
          spent -= transaction.price;
        }
      }
    });

    return spent;
  };

  useEffect(() => {
    onGetBudgets();
    onGetTransactions();
    delay(100)
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
    setUpdateSignal(false);
  }, [updateSignal]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <View style={styles.v_header}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Kế hoạch của tôi
            </Text>
            <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  padding: 8,
                  borderRadius: 30,
                }}
                onPress={() => navigate(Routes.Planning)}
              >
                <Image
                  style={styles.icon}
                  source={require("../assets/icons/ic_arrow_left.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            {budgetList?.budgets
              ? budgetList?.budgets.map((item, index) => (
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
                      <View style={{ width: "88%" }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            paddingBottom: 10,
                          }}
                        >
                          {item.title}
                        </Text>
                        <View
                          style={{ flexDirection: "row", marginVertical: 5 }}
                        >
                          <Image
                            style={{ height: 25, width: 25, marginRight: 15 }}
                            source={require("../assets/icons/ic_color_wallet.png")}
                          />

                          <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 17 }}>
                              {item.wallet.name}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{ flexDirection: "row", marginVertical: 5 }}
                        >
                          <Image
                            style={{ height: 25, width: 25, marginRight: 15 }}
                            source={
                              categoryIconsMapper[`${item.category.icon_name}`]
                            }
                          />

                          <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 17 }}>
                              {item.category.name}
                            </Text>
                          </View>
                        </View>

                        <View>
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            + {formatCurrency(item.goal_value)} đ
                          </Text>
                          <Text style={{ color: "#777" }}>
                            Còn lại{" "}
                            {formatCurrency(
                              item.goal_value - getSpentBuget(item)
                            )}{" "}
                            đ
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          ConfirmDialog(
                            onDeleteBudget,
                            "Bạn chắc không?",
                            "Bạn có chắc muốn xóa kế hoạch này không?",
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
          <FloatingAddButton onPress={() => navigate(Routes.AddBudget)} />
        </>
      )}
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

export default BudgetList;
