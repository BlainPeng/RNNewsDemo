import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

export default class LiveComponent extends Component {

    render() {
        return (
            <View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    headContainer: {
        flex: 1,
        height: Platform.OS == 'ios' ? 70 : 50,
        backgroundColor: 'red',
        justifyContent: 'center',

    },
    headTitle: {

        textAlign: 'center',
        marginTop: Platform.OS == 'ios' ? 25 : 0,
        fontSize: 20,
        color: 'white'

    }
});
