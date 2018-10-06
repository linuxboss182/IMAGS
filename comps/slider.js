/**
 * Created by jtgaulin on 10/6/18.
 */
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { Slider } from 'react-native-elements';

const PainSlider = ({
    pain,
    onValueChange
}) => (
    <View style={styles.sliderbox}>
        <Slider style={styles.slider}
                value={pain}
                minimumValue={0}
                maximumValue={10}
                onValueChange={onValueChange}
                minimumTrackTintColor='#226FB2'
                maximumTrackTintColor='#226FB2'
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
        />
    </View>
);

export default PainSlider;

const styles = StyleSheet.create({
    sliderbox: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'rgba(50, 50, 50, 0.70)',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 72 / 2
    },
    slider: {
        marginLeft: 20,
        marginRight: 20,
    },
    track: {
        shadowColor: 'white',
        shadowOffset: {width: 10, height: 10},
        shadowRadius: 30,
        shadowOpacity: 0.15,
        height: 5
    },
    thumb: {
        width: 30,
        height: 30,
        backgroundColor: '#F0F8FF',
        borderColor: 'lightgray',
        borderWidth: 2,
        borderRadius: 10,
    }
});



