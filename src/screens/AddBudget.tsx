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
import { grey3 } from "../configs/colors";

const AddBudget = (props) => {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: any) => state.tokenState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Add Budget</Text>
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
      </View>

      <ScrollView></ScrollView>
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

export default AddBudget;
