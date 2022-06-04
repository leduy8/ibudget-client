import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import RootStack from "./src/navigations";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/reducer";


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="dark" translucent={false} backgroundColor="#fff" />
          <RootStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
