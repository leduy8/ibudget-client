import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { grey3 } from "../configs/colors";
import { textContent } from "../configs/textContent";
import Routes from "../configs/routes";
import Button from "../components/Button";

const AccountDetails = (props) => {
    const { user } = useSelector((state: any) => state.userState)
    const { navigate } = useNavigation();

    const getAvatarInitial = (name: any) => {
        if (name != undefined && name != null && name != {}) {
            var values = name.split(" ");
            var letter = values[values.length - 1].charAt(0);
            return letter;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.v_header}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    My Account
                </Text>
                <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
                        onPress={() => navigate(Routes.Account)}
                    >
                        <Image
                            style={styles.icon}
                            source={require("../assets/icons/ic_arrow_left.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.v_account_detail}>
                <View style={styles.v_avatar}>
                    <Text style={{ fontSize: 40, color: '#FFF', fontWeight: 'bold' }}>
                        {getAvatarInitial(user?.name)}
                    </Text>
                </View>
                <Text style={styles.txt_username}>{user?.name}</Text>
            </View>

            <Button
                iconName={require("../assets/icons/ic_key.png")}
                buttonName={textContent.ACCOUNT_DETAILS.CHANGE_PASSWORD}
                onPress={() => navigate(Routes.ChangePassword)}
            />
        </SafeAreaView>
    );
}

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
    },

    icon: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    },

    v_account_detail: {
        paddingHorizontal: 15,
        paddingTop: 20,
        alignItems: "center",
        paddingBottom: 30,
        borderBottomWidth: 0.3,
        borderBottomColor: grey3,
        backgroundColor: "#fff",
    },

    v_avatar: {
        height: 60,
        width: 60,
        backgroundColor: "purple",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    txt_username: {
        paddingTop: 15,
        fontSize: 15,
    },
});

export default AccountDetails;