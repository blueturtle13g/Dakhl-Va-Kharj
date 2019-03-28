import React from "react";
import { Header } from "react-navigation";
import {
    Platform,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";

const w = Dimensions.get("window");
const CustomHeader =props=> {
    return (
        <LinearGradient
            style={{
                height: 56,
                width: "100%",
                marginTop: Platform.OS === "ios" ? 20 : 0
            }}
            colors={["#1e3c72","#2a5298"]}
        >
            <Header {...props} />
            <Text style={styles.title}>{props.title}</Text>
        </LinearGradient>
    );
};

function mapStateToProps(store) {
    return {
        store
    };
}

export default connect(
    mapStateToProps
)(CustomHeader);

const styles = StyleSheet.create({
    title:{
        color: "#fff",
        fontSize: 24,
        fontWeight: "400",
        position: "absolute",
        height: "100%",
        width: 180,
        textAlign: "center",
        textAlignVertical: "center",
        right: (w.width/2)-90,
    }
});