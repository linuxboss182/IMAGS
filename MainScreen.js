import React, { Component } from 'react';
import { Slider } from 'react-native-elements'
import { AppRegistry, StyleSheet, View, Text } from "react-native";

export class MainScreen extends Component {
    state = {
        value: 5,
        pain: 5
    };

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => {
                        this.setState({value});
                        this.state.pain = 10-value;
                    }}
                    minimumValue={0}
                    maximumValue={10}
                    orientation="vertical"
                    minimumTrackTintColor='#0E95FF'
                    maximumTrackTintColor='#0DC1E8'
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    />
                <Text>Pain: {this.state.pain}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    },
    track: {
        shadowColor: '#0EFF60',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 1,
        shadowOpacity: 0.15,
    },
    thumb: {
        width: 30,
        height: 30,
        borderRadius: 1,
        backgroundColor: '#0DE895',
        borderColor: '#0DC1E8',
        borderWidth: 5,
        borderRadius: 10,
        shadowColor: '#0EFF60',
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.35
    }
});