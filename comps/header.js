/**
 * Created by jtgaulin on 10/5/18.
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

const Header = ({
    onDownPress,
    onQueuePress,
    onLogoutPress,
    onSearch
}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onDownPress}>
            <Image style={styles.button}
                   source={require('../img/ic_keyboard_arrow_down_white.png')} />
        </TouchableOpacity>

        <TouchableHighlight onPress={onLogoutPress}>
        <Text style={styles.message}>Logout</Text>
        </TouchableHighlight>

        <SearchBar
            round
            noIcon
            inputStyle={styles.inputStyle}
            containerStyle={styles.containerStyle}
            placeholderTextColor={'rgba(255, 255, 255, 0.72)'}
            placeholder={'Search for Song..'}
            onSubmitEditing={onSearch}
        />

        <TouchableOpacity onPress={onQueuePress}>
            <Image style={styles.button}
                   source={require('../img/ic_queue_music_white.png')} />
        </TouchableOpacity>
    </View>
);

export default Header;

const styles = StyleSheet.create({
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
    },
    button: {
        opacity: 0.72
    },
    inputStyle: {
        marginTop: 0,
        marginBottom: 0,
        height: 35,
        fontSize: 12,
        backgroundColor: 'rgba(50, 50, 50, 0.70)'
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
