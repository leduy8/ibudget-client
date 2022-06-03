import { useNavigation } from "@react-navigation/native";
import React, { memo, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Modal,
} from "react-native";
import { textContent } from "../configs/textContent";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from "victory-native";
import { Svg, Circle } from "react-native-svg";
import { windowWidth } from "../configs/constants";
import { grey1, grey2, grey3 } from "../configs/colors";
import Button from "../components/Button";

const data = [
  { quarter: 1, earnings: 50000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 10000 },
];

const data2 = [{ quarter: " ", earnings: 50000 }];

const timeData = [
  { id: 1, name: "This month", date: "01/04/2022 - 30/04/2022" },
  { id: 2, name: "Last month", date: "01/03/2022 - 31/03/2022" },
  { id: 3, name: "Last 3 month", date: "01/02/2022 - 30/04/2022" },
  { id: 4, name: "Last 6 month", date: "01/11/2021 - 30/04/2022" },
];

const pieChart = (value: any) => {
  return (
    <Svg width={170} height={170}>
      <Circle cx={85} cy={85} r={23} fill="#2f2f2f"></Circle>
      <Circle cx={85} cy={85} r={16} fill="#fff"></Circle>
      <VictoryPie
        standalone={false}
        width={170}
        height={170}
        colorScale={["#2B4A5C", "#32C5A8", "#09ABEB", "#EFC028", "#F98F6D"]}
        innerRadius={23}
        data={value}
        x="quarter"
        y="earnings"
      />
    </Svg>
  );
};

const Report = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [timeRange, setTimeRange] = useState(timeData[0]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header here */}
        <View style={styles.v_header}>
          <View style={styles.v_wallet}>
            <TouchableOpacity
              style={{
                backgroundColor: "#364E5C",
                padding: 8,
                borderRadius: 30,
              }}
            >
              <Image
                style={styles.icon}
                source={require("../assets/icons/ic_color_wallet.png")}
              />
            </TouchableOpacity>
            <Image
              style={{
                height: 12,
                width: 12,
                resizeMode: "contain",
                marginLeft: 8,
                tintColor: "#C2C2C2",
              }}
              source={require("../assets/icons/ic_down_arrow.png")}
            />
          </View>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.v_time_range}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  textAlignVertical: "center",
                }}
              >
                {timeRange.name}
              </Text>
              <Text
                style={{
                  color: "#C2C2C2",
                  fontSize: 12,
                  textAlignVertical: "center",
                }}
              >
                {timeRange.date}
              </Text>
            </View>
            <Image
              style={{
                height: 12,
                width: 12,
                resizeMode: "contain",
                marginLeft: 8,
                tintColor: "#C2C2C2",
              }}
              source={require("../assets/icons/ic_down_arrow.png")}
            />
          </TouchableOpacity>

          <View style={styles.v_noti}>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require("../assets/icons/ic_share.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chart view */}
        <View style={styles.v_pieChart}>
          <View
            style={[
              styles.v_chart_container,
              { borderRightWidth: 1, borderColor: grey2 },
            ]}
          >
            <Text style={styles.txt_chart_name}>Income</Text>
            <Text style={[styles.txt_chart_value, { color: "blue" }]}>
              0.00
            </Text>

            {pieChart(data2)}
          </View>
          <View style={styles.v_chart_container}>
            <Text style={styles.txt_chart_name}>Expense</Text>
            <Text style={[styles.txt_chart_value, { color: "red" }]}>
              50,000.00
            </Text>

            {pieChart(data)}
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderColor: grey3,
            }}
          >
            <Text
              style={{ position: "absolute", left: 0, paddingLeft: 15 }}
              onPress={() => setModalVisible(false)}
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
                  setModalVisible(false);
                }}
                key={item.id}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginHorizontal: 15,
                  borderBottomWidth: 1,
                  borderColor: grey3,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ color: "#000", fontSize: 17, marginBottom: 5 }}>
                  {item.name}
                </Text>
                <Text style={{ color: grey1 }}>{item.date}</Text>
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
    // paddingTop: 10,
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  v_wallet: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  v_time_range: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  v_noti: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  icon: { height: 22, width: 22, resizeMode: "contain" },

  v_pieChart: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: grey3,
    backgroundColor: "#fff",
  },

  v_chart_container: {
    width: windowWidth / 2,
    justifyContent: "center",
    alignItems: "center",
  },

  txt_chart_name: {
    color: grey1,
    marginBottom: 5,
  },

  txt_chart_value: {
    fontSize: 17,
  },
});
