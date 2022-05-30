import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabActions, useNavigation } from "@react-navigation/native";
import Routes from "../configs/routes";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Transactions from "../containers/Transactions";
import Report from "../containers/Report";
import Planning from "../containers/Planning";
import Account from "../containers/Account";
import AddTransaction from "../containers/AddTransaction";
import Learning from "../containers/Learning";
import { mainColor } from "../configs/colors";

const Tab = createBottomTabNavigator();

const CustomQrScanButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      justifyContent: "center",
      alignItems: "center",
      //...styles.shadow
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: mainColor,
        marginBottom: 30,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const MainTab = () => {
  const { navigate } = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBarStyle,
          // {...styles.shadow}
        ],
      }}
    >
      <Tab.Screen
        name={Routes.Transactions}
        component={Transactions}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.bt_navIcon}>
              <Image
                source={require("../assets/icons/ic_wallet.png")}
                resizeMode="cover"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#212121" : "#BDBDBD",
                }}
              />
              <Text
                style={[styles.txt_navText, focused && { color: "#212121" }]}
              >
                {Routes.Transactions}
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.Planning}
        component={Planning}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.bt_navIcon}>
              <Image
                source={require("../assets/icons/ic_planning.png")}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#212121" : "#BDBDBD",
                }}
              />
              <Text
                style={[styles.txt_navText, focused && { color: "#212121" }]}
              >
                {Routes.Planning}
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.AddTransaction}
        component={AddTransaction}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/icons/ic_plus.png")}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: "#fff",
                  // tintColor: focused ? "#BDBDBD" : "#fff",
                }}
              />
            </View>
          ),
          tabBarButton: (props) => (
            <CustomQrScanButton
              {...props}
              // onPress={() => navigate()}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.Learning}
        component={Learning}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.bt_navIcon}>
              <Image
                source={require("../assets/icons/ic_learning.png")}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#212121" : "#BDBDBD",
                }}
              />
              <Text
                style={[styles.txt_navText, focused && { color: "#212121" }]}
              >
                {Routes.Learning}
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={Routes.Account}
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.bt_navIcon}>
              <Image
                source={require("../assets/icons/ic_user.png")}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: focused ? "#212121" : "#BDBDBD",
                }}
              />
              <Text
                style={[styles.txt_navText, focused && { color: "#212121" }]}
              >
                {Routes.Account}
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    justifyContent: "center",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // elevation: 3,
  },

  txt_navText: {
    fontSize: 13,
    marginTop: 5,
    color: "#BDBDBD",
  },

  bt_navIcon: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red'
  },
});
