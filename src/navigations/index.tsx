import { useSelector } from "react-redux";
import React, { memo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Routes from "../configs/routes";
import MainTab from "./MainTab";
import Register from "../screens/Register";
import Login from "../screens/Login";
import WalletList from "../screens/WalletList";
import AccountDetails from "../screens/AccountDetails";
import ChangePassword from "../screens/ChangePassword";
import Report from "../screens/Report";
import TransactionDetails from "../screens/TransactionDetail";
import EditTransaction from "../screens/EditTransaction";
import BudgetList from "../screens/BudgetList";
import AddBudget from "../screens/AddBudget";

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
            name={Routes.Report}
            component={Report}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.WalletList}
            component={WalletList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.AccountDetails}
            component={AccountDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.ChangePassword}
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.TransactionDetails}
            component={TransactionDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.EditTransaction}
            component={EditTransaction}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.BudgetList}
            component={BudgetList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={Routes.AddBudget}
            component={AddBudget}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
});

export default RootStack;
