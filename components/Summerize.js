import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {toPersian} from "../utils";

export default ({income, expense})=> {
    return (
        <View
            style={styles.container}
        >
            <View style={styles.key_val}>
                <Text style={[styles.text, styles.key]}>درآمد کل:</Text>
                <Text style={[styles.text, styles.value]}>
                    {toPersian(income.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
                </Text>
            </View>
            <View style={styles.key_val}>
                <Text style={[styles.text, styles.key]}>هزینه کل: </Text>
                <Text style={[styles.text, styles.value]}>
                    {toPersian(expense.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
                </Text>
            </View>
            <View style={styles.key_val}>
                <Text style={[styles.text, styles.key]}>دخل و خرج: </Text>
                <Text style={[styles.text, styles.value]}>
                    {toPersian((income - expense).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: 82,
        backgroundColor: "#cfdef3"
    },
    text:{
        textAlign: "center",
        fontSize: 18,
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
