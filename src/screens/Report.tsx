import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, ScrollView, Modal, } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { windowWidth } from "../configs/app";
import { chartColors, frown, grey1, grey3, happy } from "../configs/colors";
import { useSelector } from "react-redux";
import { getReportDates, toDisplayDate } from "../ultils/date";
import { getTransactions } from "../services/transaction";
import { sortArrayObjectByKey } from '../ultils/array';
import { chartConfig } from "../configs/chart";
import { expenseMapper, incomeMapper } from "../ultils/mapper";

function getTop4AndOthers(array: Array<any>) {
    let resArr = array.slice(0, 4);
    let remainArr = array.slice(4);

    resArr.push({
        name: "Others",
        price: 0,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    });

    remainArr.map((item) => {
        if (item.name in incomeMapper)
            resArr[4].price += item.price;
        else if (item.name in expenseMapper)
            resArr[4].price += item.price * -1;
    });

    resArr.map((item, index) => item["color"] = chartColors[index]);

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

    const onGetTotalTransactionByCategory = (data) => {
        let totalExpenseByCategory: any = [
            {
                name: "Transportation",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Gifts & Donation",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Food & Beverage",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Bills",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Shopping",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Friends & Lover",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Entertainment",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Travel",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Health & Fitness",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Family",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Education",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Investment",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Business",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Other Expense",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            }
        ];

        let totalIncomeByCategory: any = [
            {
                name: "Salary",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Selling",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Interest Money",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Gifts",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Awards",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Funding",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
            {
                name: "Other Income",
                price: 0,
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
            },
        ];

        data.transactions.map((transaction) => {
            if (transaction.category.type === "Expense")
                totalExpenseByCategory[expenseMapper[transaction.category.name]].price += transaction.price * -1;
            else if (transaction.category.type === "Income")
                totalIncomeByCategory[incomeMapper[transaction.category.name]].price += transaction.price;
        });

        totalExpenseByCategory = sortArrayObjectByKey(totalExpenseByCategory, "price", false);
        totalExpenseByCategory = getTop4AndOthers(totalExpenseByCategory);

        totalIncomeByCategory = sortArrayObjectByKey(totalIncomeByCategory, "price", false);
        totalIncomeByCategory = getTop4AndOthers(totalIncomeByCategory);

        setExpenseByCategory([...totalExpenseByCategory]);
        setIncomeByCategory([...totalIncomeByCategory]);
    }

    const onGetTransactions = async () => {
        const params = {
            "from_date": timeRange["dateStart"],
            "to_date": timeRange["dateEnd"],
            "wallet_id": focusWallet.id,
        };
        const data: any = await getTransactions(token, params);

        onGetTotalTransactionByCategory(data);
    }

    useEffect(() => {
        onGetTransactions();
    }, [timeRange]);

    return (
        <SafeAreaView style={styles.container}>
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
                        <Text style={{ color: "#C2C2C2", fontSize: 12, textAlignVertical: "center" }}>
                            {toDisplayDate(timeRange.dateStart)} - {toDisplayDate(timeRange.dateEnd)}
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
                    <Text style={[styles.pieChartText, { color: frown }]}>Expense</Text>
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
                    <Text style={[styles.pieChartText, { color: happy }]}>Income</Text>
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
                            Close
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                            Select Time Range
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
                                <Text style={{ color: "#000", fontSize: 17, marginBottom: 5 }}>
                                    {item.title}
                                </Text>
                                <Text style={{ color: grey1 }}>
                                    {toDisplayDate(item.dateStart)} - {toDisplayDate(item.dateEnd)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
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
        fontWeight: "700"
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
