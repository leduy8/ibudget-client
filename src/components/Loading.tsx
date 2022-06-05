import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <View style={styles.v_spinner}>
        <ActivityIndicator size="large" color="lightblue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#70707077",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  v_spinner: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});
