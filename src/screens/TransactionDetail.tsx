import React from "react";
import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Routes from "../configs/routes";
import { frown, happy } from "../configs/colors";
import { categoryIconsMapper } from "../ultils/mapper";
import { toDisplayDate } from "../ultils/date";
import { deleteTransaction } from "../services/transaction";
import { setUpdateSignal } from "../redux/actions/updateSignalAction";
import ConfirmDialog from "../components/ConfirmDialog";
import PlainItemBar from '../components/PlainItemBar';
import { transactInWallet } from "../services/wallet";
import AlertPopUp from "../components/AlertPopUp";


const TransactionDetails = (props) => {
    const { navigate } = useNavigation();
    const { token } = useSelector((state: any) => state.tokenState);
    const { focusTransaction } = useSelector((state: any) => state.focusTransactionState);

    const onUpdateAfterDeletion = async () => {
        const temp: any = await transactInWallet(token, { "price": focusTransaction.price * -1 }, focusTransaction.wallet.id);

        if (temp.error_message) {
            AlertPopUp("", temp.error_message);
        };
    }

    const onDeleteTransaction = async () => {
        deleteTransaction(token, focusTransaction.id);
        await onUpdateAfterDeletion();
        setUpdateSignal(true);
        navigate(Routes.Transactions);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: "#fff" }}>
                <View style={styles.v_header}>
                    <View style={{ position: "absolute", left: 0, paddingLeft: 15 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
                            onPress={() => navigate(Routes.Transactions)}
                        >
                            <Image
                                style={styles.icon}
                                source={require("../assets/icons/ic_arrow_left.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: "absolute", right: 0, paddingRight: 15, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
                            onPress={() => navigate(Routes.EditTransaction)}
                        >
                            <Image
                                style={styles.icon}
                                source={require("../assets/icons/ic_pencil.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: "#fff", padding: 8, borderRadius: 30 }}
                            onPress={() => {
                                ConfirmDialog(onDeleteTransaction, "Are you sure?", "Are you sure that you want to delete this transaction?");
                            }}
                        >
                            <Image
                                style={styles.icon}
                                source={require("../assets/icons/ic_trash_bin.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff" }}>
                    <PlainItemBar
                        iconName={categoryIconsMapper[`${focusTransaction.category.icon_name}`]}
                        name={focusTransaction.category.name}
                    />
                    <PlainItemBar
                        name={`${focusTransaction.category.type === "Income" ? "+" : " "}${focusTransaction.price} đ`}
                        customStylesText={{
                            fontSize: 30,
                            marginLeft: 10,
                            color: `${focusTransaction.category.type === "Income" ? happy : frown}`
                        }}
                    />
                    {focusTransaction.note ? (
                        <PlainItemBar
                            iconName={require("../assets/icons/ic_notes.png")}
                            name={focusTransaction.note}
                        />
                    ) : null}
                    <PlainItemBar
                        iconName={require("../assets/icons/ic_planning.png")}
                        name={toDisplayDate(focusTransaction.created_date)}
                    />
                    <PlainItemBar
                        iconName={require("../assets/icons/ic_color_wallet.png")}
                        name={focusTransaction.wallet.name}
                    />
                    <PlainItemBar
                        name={`Is this a positive transaction: ${focusTransaction.is_positive ? "Yes!" : "No."}`}
                        children={
                            <Icon
                                style={{ marginLeft: 5, marginTop: 2 }}
                                name={`${focusTransaction.is_positive ? "smile-o" : "frown-o"}`}
                                size={20}
                                color={`${focusTransaction.is_positive ? happy : frown}`}
                            />
                        }
                    />
                </View>
            </View>
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
    },

    icon: {
        height: 15,
        width: 15,
        resizeMode: "contain",
        paddingHorizontal: 10,
    },
});

export default TransactionDetails;