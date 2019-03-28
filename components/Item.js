import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {toPersian} from "../utils";

export default class Item extends React.Component {

    render() {
        const {
            item:{
                title,
                description,
                is_income,
                cost,
            },
            edit,
            del,
            side_sum,
            onPress
        } = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
            >
            <View
                style={[styles.container, is_income &&{backgroundColor: "#009bba"}]}
            >
                {title.length > 0 &&(
                    <View style={styles.inputGroup}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                )}

                {description.length > 0 &&(
                    <View style={styles.inputGroup}>
                        <Text>{description}</Text>
                    </View>
                )}

                <View style={styles.inputGroup}>
                    <Text style={styles.title}>{toPersian(cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}</Text>
                </View>
                {!side_sum &&(
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.button, styles.edit]}
                            onPress={edit}
                        >
                            <AntDesign name={"edit"} size={25} color={"#fff"}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.delete]}
                            onPress={del}
                        >
                            <MaterialCommunityIcons name={"delete-sweep"} size={25} color={"#fff"}/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: null,
        overflow: "hidden",
        margin: 5,
        elevation: 5,
        backgroundColor: "#ff6868",
    },
    inputGroup:{
        justifyContent: "center",
        alignItems: "center",
        margin: 3,
    },
    buttonGroup:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button:{
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: 35,
    },
    start:{
        backgroundColor:"rgba(69, 170, 112, .8)",
    },
    stop:{
        backgroundColor:"rgba(170, 89, 79, .8)",
    },
    delete:{
        backgroundColor:"#aa7155",
    },
    edit:{
        backgroundColor:"#4c90aa",
    },
    textWhite:{
        color:"#fff",
    },
    title:{
        fontSize: 20,
        color: "#3b3b3b"
    },
    description:{

    },
    timer:{
        fontSize: 18,
        color: "#e5e5e5"
    },
    doneCon:{
        width: 60,
        height: 32,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        alignSelf: "center",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});