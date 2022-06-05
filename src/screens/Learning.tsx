import React from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Learning = (props) => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.v_header_name, { marginVertical: 20 }]}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Learning</Text>
        </View>
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

export default Learning;
