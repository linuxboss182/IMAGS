/**
 * Created by jtgaulin on 10/5/18.
 */

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const Track = ({
    title,
    artist,
    onAddPress,
    onMorePress,
    onTitlePress,
    onArtistPress,
}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onAddPress}>
            <Image style={styles.button}
                   source={require('../img/ic_add_circle_outline_white.png')} />
        </TouchableOpacity>
        <View style={styles.detailsWrapper}>
            {title ?
            [<Text key={1} style={styles.title} onPress={onTitlePress}>{title}</Text>,
            <Text key={2} style={styles.artist} onPress={onArtistPress}>{artist}</Text>]
                : null
            }
        </View>
        <TouchableOpacity onPress={onMorePress}>
            <View style={styles.moreButton}>
                <Image style={styles.moreButtonIcon}
                       source={require('../img/ic_more_horiz_white.png')} />
            </View>
        </TouchableOpacity>
    </View>
);

export default Track;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        paddingRight: 20,
    },
    detailsWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    artist: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        opacity: 0.72,
    },
    moreButton: {
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        opacity: 0.72,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreButtonIcon: {
        height: 17,
        width: 17,
    }
});