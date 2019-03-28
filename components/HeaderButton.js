import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { updateProp } from '../actions';
import {SIDE_SUM_OPEN, YEAR_SCREEN} from "../actions/types";

const HeaderButton = ({updateProp, store:{ side_sum_open }, state, goBack })=>{
    return(
        <TouchableOpacity
            onPress={()=>{
                if(state.routeName !== YEAR_SCREEN) goBack();
                else updateProp({key: SIDE_SUM_OPEN, value: !side_sum_open});
            }}
            style={{marginLeft: 10}}
        >
            {state.routeName !== YEAR_SCREEN  ? <SimpleLineIcons name={"arrow-right"} color={"#fff"} size={22}/>
                :
                <MaterialCommunityIcons name={"menu"} color={side_sum_open ? "#2b2b2b" : "#fff"} size={35}/>
            }
        </TouchableOpacity>
    )
};

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps, {updateProp}
)(HeaderButton);
