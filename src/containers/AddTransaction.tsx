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
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { grey1, grey3 } from "../configs/colors";
import { getCategories } from "../services/category";

const AddTransaction = () => {
  const [money, setMoney] = useState<any>(0);
  const [categories, setCategories] = useState<any>();
  const [categoryFocus, setCategoryFocus] = useState<any>(categories);
  const [toggleCategory, setToggleCategory] = useState<any>(false);
  const { token } = useSelector((state: any) => state.tokenState);
  const [modalVisiable, setModalVisiable] = useState<any>(false);

  const onGetCategories = async () => {
    const temp = await getCategories(token);
    if (temp?.categories) {
      setCategories(temp);
    }
  };

  useEffect(() => {
    onGetCategories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.v_header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Add Transactions
        </Text>
        <Text style={{ position: "absolute", right: 0, paddingRight: 15 }}>
          Save
        </Text>
      </View>

      <View style={styles.v_add_content}>
        <View>
          <Text style={{ paddingLeft: "10%", marginTop: 10, marginLeft: 20 }}>
            Amount
          </Text>
          <View style={styles.v_money}>
            <TouchableOpacity style={styles.bt_money}>
              <Text>VND</Text>
            </TouchableOpacity>
            <View style={styles.v_input_money}>
              <TextInput
                style={styles.txt_input_money}
                keyboardType="numeric"
                value={money.toString()}
                onChangeText={setMoney}
              />
            </View>
          </View>
        </View>

        {/* <View style={styles.v_category}>
          <Image
            style={{ height: 30, width: 30, resizeMode: "contain" }}
            source={require("../assets/icons/ic_category.png")}
          />
          <View>
            <Text>{categoty}</Text>
            <Image
              style={[styles.icon, styles.margin_right]}
              source={require("../assets/icons/ic_arrow_right.png")}
            />
          </View>
        </View> */}

        <Button
          buttonName={categoryFocus?.name}
          iconName={require("../assets/icons/ic_category.png")}
          onPress={() => setModalVisiable(!modalVisiable)}
        />

        <Button
          buttonName="Note"
          iconName={require("../assets/icons/ic_notes.png")}
        />
        <Button
          buttonName="15/04/2022"
          iconName={require("../assets/icons/ic_planning.png")}
        />
        <Button
          buttonName="Cash"
          iconName={require("../assets/icons/ic_color_wallet.png")}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiable}
        onRequestClose={() => {
          setModalVisiable(!modalVisiable);
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 10,
              borderBottomWidth: 0.2,
              paddingBottom: 10,
              borderColor: "#F5F5F5",
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{ position: "absolute", left: 12, top: 10 }}
              onPress={() => setModalVisiable(false)}
            >
              Close
            </Text>
            <Text>Select Category</Text>
            {/* <Text style={{ position: "absolute", right: 12, top: 10 }}>
              Edit
            </Text> */}
          </View>
          <ScrollView>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 15,
                  marginVertical: 20,
                }}
              >
                1
              </Text>
              {categories?.categories.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategoryFocus(item), setModalVisiable(!modalVisiable);
                  }}
                  key={index}
                  style={{
                    paddingVertical: 15,
                    backgroundColor: "#fff",
                    marginHorizontal: 20,
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginBottom: 5,
                  }}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              ))}
              <Text>2</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddTransaction;

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
    marginBottom: 30,
  },

  v_add_content: {
    backgroundColor: "#fff",
    width: "100%",
  },

  v_money: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  bt_money: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: grey3,
    alignItems: "center",
    flex: 0.1,
  },

  v_input_money: {
    marginLeft: 15,
    paddingBottom: 10,
    marginBottom: -8,
    flex: 0.9,
    justifyContent: "center",
  },
  txt_input_money: {
    fontSize: 40,
  },

  v_category: {
    flexDirection: "row",
  },

  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: grey1,
  },

  margin_right: { position: "absolute", right: 0, tintColor: grey3 },
});
