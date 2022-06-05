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
import { getBudgets } from "../services/budget";
import { grey3 } from "../configs/colors";
import FloatingAddButton from "../components/FloatingAddButton";

const BudgetList = (props) => {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);
  const [budgetList, setBudgetList] = useState([]);

  const onGetBudgets = async () => {
    const temp: any = await getBudgets(token);
    setBudgetList(temp);
  };

  useEffect(() => {
    // onGetBudgets();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>My Budgets</Text>
        <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
            onPress={() => navigate(Routes.Planning)}
          >
            <Image
              style={styles.icon}
              source={require("../assets/icons/ic_arrow_left.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView></ScrollView>
      <FloatingAddButton onPress={() => navigate(Routes.AddBudget)} />
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
