import React from 'react';
import {
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {
    COST,
    DESCRIPTION,
    TITLE
} from "../actions/types";
import MyRadioButton from './MyRadioButton';

class ItemForm extends React.Component {

    render() {
        const {
            values :{
                title,
                description,
                cost,
                is_income
            },
            cancel,
            submit,
            updateValue,
            is_adding
        } = this.props;

        return (
            <View style={styles.container}>

                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={"عنوان"}
                        placeholderTextColor={"#e6e8e9"}
                        style={[styles.input, {color: "#3b3b3b"}]}
                        value={title}
                        autoCorrect={false}
                        onChangeText={value=>updateValue(TITLE, value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={"توضیحات"}
                        placeholderTextColor={"#e6e8e9"}
                        multiline={true}
                        style={[styles.input, {fontSize: 16}]}
                        value={description}
                        autoCorrect={false}
                        onChangeText={value=>updateValue(DESCRIPTION, value)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <TextInput
                        keyboardType={"decimal-pad"}
                        placeholder={"قیمت"}
                        placeholderTextColor={"#e6e8e9"}
                        value={cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                        style={[styles.input, {fontSize: 18}]}
                        onChangeText={value=>updateValue(COST, value.toString().replace(/\D/g,''))}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <MyRadioButton is_income={is_income} updateValue={updateValue}/>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.button, styles.done, !is_adding && {width: "100%"}]}
                        onPress={submit}
                    >
                        <AntDesign name={"check"} size={30} color={"#fff"}/>
                    </TouchableOpacity>
                    {is_adding &&(
                        <TouchableOpacity
                            style={[styles.button, styles.cancel]}
                            onPress={cancel}
                        >
                            <Entypo name={"cross"} size={30} color={"#fff"}/>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

mapStateToProps = store=>{
    return {store}
};

export default connect(mapStateToProps)(ItemForm);

const styles = StyleSheet.create({
    container:{
        margin: 3,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "#4ac29a",
        zIndex: 10
    },
    inputGroup:{
        justifyContent: "center",
        alignItems: "center",
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
    cancel:{
        backgroundColor:"#aa7155",
    },
    done:{
        backgroundColor:"#466380",
    },
    textWhite:{
        color:"#fff",
    },
    input:{
        fontSize: 19,
        width: "95%",
        padding: 2,
        textAlign: "center"
    },
    timePickers:{
        width: "80%",
        flexDirection: "row",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 3
    },
    picker:{
        width: 100,
        marginVertical: 5,
        textAlign: "center",
        borderWidth: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
    }
});