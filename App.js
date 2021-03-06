import React from "react";
import {
    I18nManager,
} from 'react-native';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import AppContainer from './AppContainer';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        I18nManager.forceRTL(true);
    }

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppContainer/>
                </PersistGate>
            </Provider>
        )
    }
}