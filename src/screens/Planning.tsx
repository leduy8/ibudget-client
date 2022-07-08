import React from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import Button from "../components/Button";

const Planning = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.v_header_name, { marginVertical: 20 }]}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Lên kế hoạch chi tiêu
          </Text>
        </View>

        <Button
          iconName={require("../assets/icons/ic_planning.png")}
          buttonName={"Các kế hoạch"}
          onPress={() => navigate(Routes.BudgetList)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  v_header_name: {
    paddingHorizontal: 15,
  },
});

export default Planning;
