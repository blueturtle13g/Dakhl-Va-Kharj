import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";

import { updateProp } from '../actions';
import {
    CURRENT_DAY,
    DAY_SCREEN,
    MONTHS
} from "../actions/types";
import Block from '../components/Block';
import CustomHeader from '../components/CustomHeader';
import Summerize from '../components/Summerize';
import ShowMost from '../components/ShowMost';
import HeaderButton from '../components/HeaderButton';
import { summerizeItems, getMost} from '../utils';

const w = Dimensions.get("window");
let navTitle = "";

class MonthScreen extends Component {

    componentDidMount() {
        navTitle = this.props.store.current_month;
    }

    static navigationOptions =  ({ navigation })=> ({
        header: props => <CustomHeader {...props} title={navTitle} />,
        headerStyle: {
            backgroundColor: "transparent"
        },
        headerTintColor: "#fff",
        headerLeft: <HeaderButton {...navigation}/>,
    });

    render() {
        const { updateProp, navigation, store:{ items, current_month } } = this.props;
        const summerized = summerizeItems(items[MONTHS.indexOf(current_month)]);
        const returned_most = getMost(items[MONTHS.indexOf(current_month)], true);
        let days = [];
        for(let i=1; i<=31; i++){
            days.push(i)
        }
        return (
            <LinearGradient
                style={styles.container}
                colors={["#7474bf","#348ac7"]}
            >
                <View style={styles.blocks_con}>
                {days.map(day=>{
                    return(
                        <View style={styles.block_con} key={day}>
                            <Block
                                onPress={()=>{
                                    updateProp({key: CURRENT_DAY, value: day});
                                    navigation.push(DAY_SCREEN)
                                }}
                                title={day}
                            />
                        </View>
                    )
                })}
                </View>
                <View style={styles.sum_con}>
                    <ShowMost most_income={returned_most[0]} most_expense={returned_most[1]} for_days={true}/>
                    <Summerize income={summerized[0]} expense={summerized[1]}/>
                </View>
            </LinearGradient>
        );
    }
}

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(MonthScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#d7dde8"
    },
    block_con:{
        width: w.width/5,
        height: w.width/8
    },
    blocks_con:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 1,
        zIndex: 1
    },
    sum_con:{
        margin: 5,
        borderRadius: 10,
        overflow: "hidden"
    }
});
