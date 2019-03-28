import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    UIManager,
    LayoutAnimation,
    ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from "react-native-linear-gradient";

import Item from '../components/Item';
import ItemForm from '../components/ItemForm';
import CustomHeader from '../components/CustomHeader';
import HeaderButton from '../components/HeaderButton';
import { summerizeItems, toPersian} from "../utils";
import { updateProp, add, del, updateItem } from '../actions';
import {
    IS_UPDATING,
    MONTHS,
} from "../actions/types";
import Summerize from "../components/Summerize";

let navTitle = "";

class DayScreen extends Component {
    state = {
        title: "",
        description: "",
        cost: "",
        is_income: false,
        is_adding: false,
        utilities_open: false
    };

    componentDidMount() {
        navTitle = `${toPersian(this.props.store.current_day)} ${this.props.store.current_month}`;
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    static navigationOptions = ({ navigation })=> ({
        header: props => <CustomHeader {...props} title={navTitle}/>,
        headerStyle: {
            backgroundColor: "transparent"
        },
        headerTintColor: "#fff",
        headerLeft: <HeaderButton {...navigation}/>,
    });

    renderToggler =()=>{
        const {utilities_open} = this.state;
        return(
            <View style={[styles.center_toggler, utilities_open &&{height: 150}]}>
                <TouchableOpacity
                    style={styles.toggler_con}
                    onPress={()=>this.setState({utilities_open: !utilities_open})}
                    activeOpacity={.5}
                >
                    <MaterialCommunityIcons name={utilities_open ? "chevron-double-down" : "chevron-double-up"} size={30}/>
                </TouchableOpacity>
            </View>
        )

    };

    submit = ()=>{
        const { add, store:{ current_month, current_day} } = this.props;
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
                month: current_month,
                day: current_day
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

    renderItem = ({item, index})=>{
        const { del, updateItem } = this.props;
        if(item.is_updating){
            return <ItemForm
                updateValue={(key, value)=>updateItem({index, month: item.month, key, value})}
                values={item}
                submit={()=>updateItem({index, month: item.month,
                    key: IS_UPDATING, value: false})}
                is_adding={false}
            />
        }
        return <Item
            item={item}
            edit={()=>updateItem({index, month: item.month, key: IS_UPDATING, value: true})}
            del={()=>del(item)}
        />
    };

    render() {
        const { store:{items, current_month, current_day} } = this.props;
        const {
            is_adding,
            utilities_open
        } = this.state;
        const today_items = items[MONTHS.indexOf(current_month)].filter(item=> item.day === current_day);
        const summerized = summerizeItems(today_items);
        return (
            <LinearGradient
                style={styles.container}
                colors={["#7474bf","#348ac7"]}
            >
                {!today_items.length &&(
                    <Animatable.Text
                        animation="flipInX"
                        iterationCount={1}
                        style={styles.no_item}>
                        شما هیچ موردی برای این تاریخ ثبت نکرده اید.
                    </Animatable.Text>
                )}
                <FlatList
                    data={today_items}
                    keyExtractor={item=>item.id.toString()}
                    renderItem={this.renderItem}
                />
                {this.renderToggler()}
                {(is_adding && utilities_open) &&(
                    <ItemForm
                        updateValue={(key, value)=>this.setState({[key]: value})}
                        values={this.state}
                        cancel={()=>this.setState({is_adding: false})}
                        submit={this.submit}
                        is_adding={true}
                    />
                )}
                {(!is_adding && utilities_open) &&(
                    <View style={styles.sum_con}>
                        <Summerize income={summerized[0]} expense={summerized[1]}/>
                        <TouchableOpacity
                            onPress={()=>this.setState({is_adding: true})}
                            style={styles.addCon}
                            activeOpacity={.9}
                        >
                            <Animatable.View
                                animation="pulse"
                                iterationCount="infinite"
                            >
                                <MaterialCommunityIcons
                                    name={"plus"}
                                    size={45}
                                    color={"#3854aa"}
                                />
                            </Animatable.View>
                        </TouchableOpacity>
                    </View>
                )}
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
    mapStateToProps, {updateProp, add, del, updateItem}
)(DayScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#aaa"
    },
    addCon:{
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        zIndex: 10
    },
    toggler_con:{
        backgroundColor: "#ece9e6",
        width: 50,
        height: 29,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    center_toggler:{
        position: "absolute",
        bottom: 0,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    sum_con:{
        margin: 3,
        borderRadius: 10,
        overflow: "hidden"
    },
    no_item:{
        color: "#ffffff",
        fontSize: 21,
        textAlign: "center",
        marginTop: 10
    }
});
