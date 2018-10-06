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

const AlbumArt = ({
    url,
    onPress
}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Image
                style={styles.image}
                source={{uri: url}}
            />
        </TouchableOpacity>
    </View>
);

export default AlbumArt;

const { width, height } = Dimensions.get('window');
const imageSize = width - 98;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 48,
        paddingRight: 48,
    },
    image: {
        width: imageSize,
        height: imageSize,
    }
});

