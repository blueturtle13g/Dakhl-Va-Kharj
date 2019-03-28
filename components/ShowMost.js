import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {toPersian} from "../utils";

export default ({most_income, most_expense, for_days})=> {
    return (
        <View
            style={{backgroundColor: "#cfdef3"}}
        >
            <View style={styles.key_val}>
                <Text style={[styles.text, styles.key]}>{for_days ? "پر درآمد ترین روز:" : "پر درآمد ترین ماه:"}</Text>
                <Text style={[styles.text, styles.value]}>{toPersian(most_income)}</Text>
            </View>
            <View style={styles.key_val}>
                <Text style={[styles.text, styles.key]}>{for_days ? "پر هزینه ترین روز:" : "پر هزینه ترین ماه:"}</Text>
                <Text style={[styles.text, styles.value]}>{toPersian(most_expense)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "transparent"
    },
    text:{
        textAlign: "center",
        fontSize: 18
    },
    key:{
        fontSize: 19,
        fontWeight: "400"
    },
    value:{
        width: 100
    },
    key_val:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
});
