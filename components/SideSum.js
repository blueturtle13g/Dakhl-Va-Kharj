import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    UIManager,
    LayoutAnimation,
    Dimensions,
    Text,
    TouchableOpacity,
    FlatList,
    ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";

import Summerize from './Summerize';
import ItemForm from './ItemForm';
import Item from './Item';

import {
    summerizeItems,
    toPersian
} from '../utils';
import { updateProp, add } from '../actions';
import {CURRENT_DAY, CURRENT_MONTH, DAY_SCREEN, MONTHS, SIDE_SUM_OPEN} from "../actions/types";

const w = Dimensions.get("window");

class SideSum extends Component {
    state={
        title: "",
        description: "",
        cost: "",
        is_income: false,
        is_adding: false
    };

    submit = ()=>{
        const { add, store:{ correct_month, correct_day} } = this.props;
        const {
            title,
            description,
            cost,
            is_income
        } = this.state;
        if(!!cost) {
            add({
                title,
                description,
                cost,
                is_income,
                month: correct_month,
                day: correct_day
            });
            this.setState({
                title: "",
                description: "",
                cost: "",
                is_income: false,
                is_adding: false
            })
        }
        else ToastAndroid.show('فیلد قیمت اجباری میباشد.', ToastAndroid.SHORT);
    };

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    renderItem = ({item})=>{
        const { updateProp, navigate, store:{ correct_day, correct_month} } = this.props;
        return <Item
            item={item}
            side_sum={true}
            onPress={()=>{
                navigate(DAY_SCREEN);
                updateProp([
                    {key: CURRENT_DAY, value: correct_day},
                    {key: CURRENT_MONTH, value: correct_month},
                    {key: SIDE_SUM_OPEN, value: false},
                ])
            }}
        />
    };

    render() {
        const { store:{ items, side_sum_open, year, correct_month, correct_day }, updateProp } = this.props;
        const {
            is_adding
        } = this.state;
        const today_items = items[MONTHS.indexOf(correct_month)].filter(item=> item.day === correct_day);
        const summerized = summerizeItems(today_items);
        return (
            <View
                style={[
                    styles.container,
                    (side_sum_open)&&{left: 0}
                ]}
            >
                <LinearGradient
                    colors={["#ece9e6","#ffffff"]}
                    style={styles.sub_con}
                >
                    <View style={styles.content_con}>
                            <View style={{backgroundColor: "#cfdef3"}}>
                                <Text style={styles.date_text}> {toPersian(correct_day)} {correct_month} {toPersian(year)}</Text>
                                <Summerize income={summerized[0]} expense={summerized[1]}/>
                                {is_adding ?
                                    <ItemForm
                                        updateValue={(key, value)=>this.setState({[key]: value})}
                                        values={this.state}
                                        cancel={()=>this.setState({is_adding: false})}
                                        submit={this.submit}
                                        is_adding={true}
                                    />
                                    :
                                    <TouchableOpacity
                                        onPress={()=>this.setState({is_adding: true})}
                                        style={styles.addCon}
                                        activeOpacity={.9}
                                    >
                                        <MaterialCommunityIcons
                                            name={"plus"}
                                            size={45}
                                            color={"#aaa"}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        <FlatList
                            inverted
                            data={today_items}
                            keyExtractor={item=>item.id.toString()}
                            renderItem={this.renderItem}
                        />
                    </View>
                </LinearGradient>
                <TouchableOpacity
                    onPress={()=>updateProp({key: SIDE_SUM_OPEN, value: false})}
                    style={{
                        width: "15%",
                        height: "100%"
                    }}
                />
            </View>
        );
    }
}

function mapStateToProps(store) {
    return { store }
}

export default connect(
    mapStateToProps, {updateProp, add}
)(SideSum);

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        top: 0,
        left: -w.width,
        bottom: 0,
        width: w.width,
        overflow: "hidden",
        zIndex: 10,
        flexDirection: "row",
        backgroundColor: "rgba(192,192,192, .1)"
    },
    sub_con:{
        width: "85%",
        height: "100%"
    },
    content_con:{
        flex: 1,
        justifyContent: "space-between"
    },
    date_text:{
        fontSize: 25,
        textAlign: "center"
    },
    addCon:{
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#466380",
        zIndex: 10
    },
});
