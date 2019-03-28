import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    PermissionsAndroid,
    I18nManager
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import RNRestart from 'react-native-restart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';

import { updateProp, clean } from '../actions';
import Block from '../components/Block';
import SideSum from '../components/SideSum';
import {
    CURRENT_MONTH,
    MONTH_SCREEN,
    MONTHS,
    IS_PERMITTED
} from "../actions/types";
import CustomHeader from '../components/CustomHeader';
import Summerize from '../components/Summerize';
import ShowMost from '../components/ShowMost';
import HeaderButton from '../components/HeaderButton';
import {
    genHtml,
    getMost,
    summerizeItems, toPersian, twelveToOne,
} from '../utils';
import RNHTMLtoPDF from "react-native-html-to-pdf";

let navTitle = "";
const w = Dimensions.get("window");

class YearScreen extends Component {
    state={
        notification_text: "",
        pdf_loading: false,
    };

    createPDF = ()=>{
        this.isNetworkConnected().done(async isConnected=> {
            this.setState({pdf_loading: true});
            const { year, items } = this.props.store;
            let options = {
                html: genHtml(year, items),
                fileName: `دخل و خرج ${toPersian(year)}`,
                directory: 'docs',
            };
            let file = await RNHTMLtoPDF.convert(options);
            this.setState({notification_text: "فایل شما در پوشه ی مستندات(docs) ذخیره شد.", pdf_loading: false});
            this.clearNotification();
        });
    };

    clean = ()=>{
        Alert.alert(
            'پاک سازی',
            'تمام مستندات شما پاکسازی خواهد شد و این عملیات قابل بازگشت نمی باشد.لطفا قبل از پاک سازی نسخه pdf خود را دریافت کنید.',
            [
                {
                    text: 'انصراف',
                    style: 'cancel',
                },
                {text: 'ادامه', onPress: () =>{
                        this.props.clean();
                        this.setState({notification_text: "پاک سازی انجام شد."});
                        this.clearNotification();
                    }},
            ],
        );
    };

    isNetworkConnected =()=>{
        if (Platform.OS === 'ios') {
            return new Promise(resolve => {
                const handleFirstConnectivityChangeIOS = isConnected => {
                    NetInfo.isConnected.removeEventListener('change', handleFirstConnectivityChangeIOS);
                    resolve(isConnected);
                };
                NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChangeIOS);
            });
        }
        return NetInfo.isConnected.fetch();
    };

    clearNotification = ()=>{
        setTimeout(()=>{
            this.setState({notification_text: ""});
        }, 4000);
    };

    static navigationOptions = ({ navigation })=>({
        header: props => <CustomHeader {...props} title={navTitle}/>,
        headerStyle: {
            backgroundColor: "transparent"
        },
        headerTintColor: "#fff",
        headerLeft: <HeaderButton {...navigation}/>,
    });

    async componentDidMount() {
        navTitle = toPersian(this.props.store.year);
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'اجازه دسترسی به مستندات',
                message: 'دخل و خرج، جهت گرفتن خروجی pdf از مستندات شما نیازمند این اجازه می باشد.',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.props.updateProp({key: IS_PERMITTED, value: true})
        } else {
            Alert.alert(
                'دسترسی',
                'دسترسی جهت ایجاد مستندات لغو شد!'
            );
        }
        if(!I18nManager.isRTL) RNRestart.Restart();
    }

    render() {
        const { updateProp, navigation, store:{ items, is_permitted } } = this.props;
        const { pdf_loading, notification_text } = this.state;
        const whole_items = twelveToOne(items);
        const summerized = summerizeItems(whole_items);
        const returned_most = getMost(whole_items, false);
        return (
            <LinearGradient
                style={styles.container}
                colors={["#7474bf","#348ac7"]}
            >
                <View style={styles.blocks_con}>
                    {MONTHS.map(month=>{
                        return(
                            <View style={styles.block_con} key={month}>
                                <Block
                                    onPress={()=>{
                                        updateProp({key: CURRENT_MONTH, value: month});
                                        navigation.push(MONTH_SCREEN)
                                    }}
                                    title={month}
                                />
                            </View>
                        )
                    })}
                </View>
                <View style={styles.sum_con}>
                    <ShowMost most_income={returned_most[0]} most_expense={returned_most[1]}/>
                    <Summerize income={summerized[0]} expense={summerized[1]}/>
                    {!!notification_text &&<Text style={{textAlign: "center"}}>{notification_text}</Text>}
                    {is_permitted ?
                        <View style={styles.buttons_con}>
                            <Button
                                title="دریافت pdf "
                                onPress={this.createPDF}
                                loading={pdf_loading}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.buttonStyle}
                                containerStyle={styles.buttonCon}
                                iconRight
                                icon={
                                    <Feather
                                        name="download"
                                        size={20}
                                        color="white"
                                    />
                                }
                            />
                            <Button
                                title="  پاک سازی  "
                                onPress={this.clean}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={[styles.buttonStyle, styles.clean]}
                                containerStyle={styles.buttonCon}
                                iconRight
                                icon={
                                    <MaterialCommunityIcons
                                        name="delete-variant"
                                        size={20}
                                        color="white"
                                    />
                                }
                            />
                        </View>
                    :
                    <Text style={{textAlign: "center"}}>عدم دسترسی به مستندات!</Text>
                }
                </View>
                <SideSum navigate={navigation.navigate}/>
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
    mapStateToProps, {updateProp, clean}
)(YearScreen);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "space-between",
    },
    block_con:{
        width: w.width/4,
        height: 50
    },
    blocks_con:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 1,
        zIndex: 1
    },
    sum_con:{
        marginTop: 5,
        overflow: "hidden"
    },
    buttonStyle:{
        flex: 1,
        backgroundColor: "#657aaa",
        borderRadius: 0
    },
    buttons_con:{
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        height: 40
    },
    buttonCon:{
        width: "50%"
    },
    clean:{
        backgroundColor: "#cd3e37"
    },
});