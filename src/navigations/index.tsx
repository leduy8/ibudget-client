import React, { memo, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/routes";
import MainTab from "./MainTab";
import Register from "../containers/auth/Register";
import Login from "../containers/auth/Login";
import WalletList from "../containers/WalletList";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const RootStack = memo(() => {
  const { token } = useSelector((state: any) => state.tokenState);
  return (
    <Stack.Navigator initialRouteName={Routes.Login}>
      {!token ? (
        <>
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.Register}
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={Routes.MainTab}
            component={MainTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.WalletList}
            component={WalletList}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
});

export default RootStack;
