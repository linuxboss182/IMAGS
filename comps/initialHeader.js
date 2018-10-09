/**
 * Created by andrewnemeth on 10/9/18.
 */

import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

const InitialHeader = ({

}) => (
    <View style={styles.container}>

        <Image style={styles.IMAGSIcon} source={require('../img/IMAGS_icon.png')} />
        <Text style={styles.message}>IMAGS</Text>


    </View>
);

export default Header;

const styles = StyleSheet.create({
    IMAGSIcon: {
        width: 40,
        height: 40,
        margin: 8,
    },
    container: {
        height: 72,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },
    message: {
        flex: 1,
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 10,
    },


    containerStyle: {
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'rgb(4,4,4)'
    }
});
