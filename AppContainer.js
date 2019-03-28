import React from 'react';
import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import YearScreen from './screens/YearScreen';
import MonthScreen from './screens/MonthScreen';
import DayScreen from './screens/DayScreen';

const AppNavigator = createStackNavigator({
    YearScreen,
    MonthScreen,
    DayScreen
});

export default createAppContainer(AppNavigator);