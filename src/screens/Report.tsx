import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { windowWidth } from "../configs/app";
import { chartColors, frown, grey1, grey3, happy } from "../configs/colors";
import { useSelector } from "react-redux";
import {
  checkDateInDateRange,
  getReportDates,
  toDisplayDate,
} from "../ultils/date";
import { getTransactions } from "../services/transaction";
import { getBudgets } from "../services/budget";
import { sortArrayObjectByKey } from "../ultils/array";
import { chartConfig } from "../configs/chart";
import {
  categoryIconsMapper,
  expenseMapper,
  incomeMapper,
} from "../ultils/mapper";
import { formatCurrency } from "../ultils/string";
import Loading from "../components/Loading";
import { delay } from "../ultils/time";

function getTop4AndOthers(array: Array<any>) {
  let resArr = array.slice(0, 4);
  let remainArr = array.slice(4);

  resArr.push({
    name: "Khác",
    price: 0,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  });

  remainArr.map((item) => {
    if (item.name in incomeMapper) resArr[4].price += item.price;
    else if (item.name in expenseMapper) resArr[4].price += item.price * -1;
  });

  resArr.map((item, index) => (item["color"] = chartColors[index]));

  return resArr;
}

const Report = () => {
  const timeData = getReportDates();
  const { navigate } = useNavigation();
  const [timeRange, setTimeRange] = useState(timeData[0]);
  const { token } = useSelector((state: any) => state.tokenState);
  const { focusWallet } = useSelector((state: any) => state.focusWalletState);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [incomeByCategory, setIncomeByCategory] = useState([]);
  const [dateRangeModalVisible, setDateRangeModalVisible] = useState(false);
  const [transactionList, setTransactionList]: any = useState([]);
  const [budgetList, setBudgetList]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onGetTotalTransactionByCategory = (data) => {
    let totalExpenseByCategory: any = [
      {
        name: "Xe cộ",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Quà tặng",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Ăn uống",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Hóa đơn",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Mua sắm",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Bạn bè và gia đình",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Giải trí",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Du lịch",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Sức khỏe",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Gia đình",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Giáo dục",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Đầu tư",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Doanh nghiệp",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Chi tiêu khác",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    let totalIncomeByCategory: any = [
      {
        name: "Lương",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Bán đồ",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Lãi suất",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Quà được tặng",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Phần thưởng",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Được đầu tư",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Thu nhập khác",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    data.transactions.map((transaction) => {
      if (transaction.category.type === "Expense")
        totalExpenseByCategory[
          expenseMapper[transaction.category.name]
        ].price += transaction.price * -1;
      else if (transaction.category.type === "Income")
        totalIncomeByCategory[incomeMapper[transaction.category.name]].price +=
          transaction.price;
    });

    totalExpenseByCategory = sortArrayObjectByKey(
      totalExpenseByCategory,
      "price",
      false
    );
    totalExpenseByCategory = getTop4AndOthers(totalExpenseByCategory);

    totalIncomeByCategory = sortArrayObjectByKey(
      totalIncomeByCategory,
      "price",
      false
    );
    totalIncomeByCategory = getTop4AndOthers(totalIncomeByCategory);

    setExpenseByCategory([...totalExpenseByCategory]);
    setIncomeByCategory([...totalIncomeByCategory]);
  };

  const onGetTransactions = async () => {
    const params = {
      from_date: timeRange["dateStart"],
      to_date: timeRange["dateEnd"],
      wallet_id: focusWallet.id,
    };
    const data: any = await getTransactions(token, params);
    setTransactionList(data);

    onGetTotalTransactionByCategory(data);
  };

  const onGetBudets = async () => {
    const data: any = await getBudgets(token, {
      from_date: timeRange["dateStart"],
      to_date: timeRange["dateEnd"],
      wallet_id: focusWallet.id,
    });
    console.log(data);
    setBudgetList(data);
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
          (budget.category.name === "All categories" ||
            transaction.category.name === budget.category.name)
        ) {
          spent -= transaction.price;
        }
      }
    });

    return spent;
  };

  useEffect(() => {
    onGetTransactions();
    onGetBudets();
    delay(100)
      .then(() => setIsLoading(false))
      .catch((err) => console.log(err));
  }, [timeRange]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          {/* Header here */}
          <View style={styles.v_header}>
            <View style={styles.v_back}>
              <TouchableOpacity onPress={() => navigate(Routes.Transactions)}>
                <Image
                  style={styles.iconSmall}
                  source={require("../assets/icons/ic_arrow_left.png")}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setDateRangeModalVisible(true)}
              style={styles.v_time_range}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={styles.titleScrollHeader}>{timeRange.title}</Text>
                <Text
                  style={{
                    color: "#C2C2C2",
                    fontSize: 12,
                    textAlignVertical: "center",
                  }}
                >
                  {toDisplayDate(timeRange.dateStart)} -{" "}
                  {toDisplayDate(timeRange.dateEnd)}
                </Text>
              </View>
              <Image
                style={styles.iconScrollHeader}
                source={require("../assets/icons/ic_down_arrow.png")}
              />
            </TouchableOpacity>

            <View style={styles.v_padded}></View>
          </View>

          {/* Chart view */}
          <ScrollView>
            <View style={styles.pieChartContainer}>
              <Text style={[styles.pieChartText, { color: frown }]}>
                Chi tiêu
              </Text>
              <PieChart
                data={expenseByCategory}
                width={windowWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"price"}
                backgroundColor={"#fff"}
                paddingLeft={"15"}
              />
            </View>

            <View style={styles.pieChartContainer}>
              <Text style={[styles.pieChartText, { color: happy }]}>
                Thu nhập
              </Text>
              <PieChart
                data={incomeByCategory}
                width={windowWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"price"}
                backgroundColor={"#fff"}
                paddingLeft={"15"}
              />
            </View>

            <View>
              <Text
                style={{
                  backgroundColor: "#fff",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                Kế hoạch chi tiêu của: {timeRange.title}
              </Text>
              {budgetList?.budgets.length > 0 ? (
                budgetList?.budgets.map((item, index) => (
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
                      }}
                    >
                      <View style={{ width: "88%" }}>
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
                    </View>
                  </View>
                ))
              ) : (
                <View style={{ backgroundColor: "#fff", paddingVertical: 20 }}>
                  <Text style={{ color: "#888", textAlign: "center" }}>
                    Bạn không có kế hoạch chi tiêu nào.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Modal */}
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
                      setTimeRange(item);
                      setDateRangeModalVisible(false);
                    }}
                    key={item.id}
                    style={styles.modalItem}
                  >
                    <Text
                      style={{ color: "#000", fontSize: 17, marginBottom: 5 }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ color: grey1 }}>
                      {toDisplayDate(item.dateStart)} -{" "}
                      {toDisplayDate(item.dateEnd)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  v_header: {
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: grey3,
  },

  v_padded: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  v_time_range: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  v_back: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  icon: {
    height: 22,
    width: 22,
    resizeMode: "contain",
  },

  iconSmall: {
    height: 15,
    width: 15,
    resizeMode: "contain",
  },

  iconScrollHeader: {
    height: 12,
    width: 12,
    resizeMode: "contain",
    marginLeft: 8,
    tintColor: "#C2C2C2",
  },

  titleScrollHeader: {
    fontWeight: "bold",
    fontSize: 17,
    textAlignVertical: "center",
  },

  pieChartContainer: {
    borderBottomWidth: 1,
    borderBottomColor: grey3,
    backgroundColor: "#fff",
  },

  pieChartText: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
    fontWeight: "700",
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
