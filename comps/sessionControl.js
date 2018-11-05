/**
 * Created by jtgaulin on 10/9/18.
 */

import React, { Component } from 'react';
import { Button } from 'react-native-elements';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

const sessionControl = ({
    initialSession,
    beforeSession,
    inSession,
    afterSession,
    onBegin,
    onEnd,
    onYes,
    onNo,
    onCancel
}) => (
    <View style={styles.container}>
        {initialSession ? <Text style={styles.text}>Please Rate Initial Pain</Text> :
        beforeSession ? <Button style={styles.text} buttonStyle={styles.buttonStyle} title="Begin Session" onPress={onBegin}/> :
        inSession ? <Button style={styles.text} buttonStyle={styles.buttonStyle} title="End Session" onPress={onEnd}/> :
        afterSession ? <>
                <Text style={styles.text}>Taking your medication?</Text>
                <Button style={styles.button} buttonStyle={styles.buttonStyle} title="Yes" onPress={onYes}/>
                <Button style={styles.button} buttonStyle={styles.buttonStyle} title="No" onPress={onNo}/>
                <Button style={styles.button} buttonStyle={styles.buttonStyle} title="Cancel" onPress={onCancel}/>
            </> :
        <Text style={styles.text}>Your session has ended.</Text>}
    </View>
);

export default sessionControl;

const styles = StyleSheet.create({
    container: {
        flex: 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    textInit:{
        flex: 1,
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold'
    },
    button: {
        // color: 'rgba(255, 255, 255, 0.42)',
        flex: 0.9
    },
    buttonStyle: {
        // backgroundColor: "rgba(92, 99, 216, 1)",
        backgroundColor: "#5C6BC0",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
    }
});