/**
 * Created by andrewnemeth on 11/5/18.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    TouchableHighlight, TextInput
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {Content} from "native-base";

const DynamicDataForm = ({
                            sbp,
                            bmi,
                             hbp,
                             handleSBPChange,
                             handleBMIChange,
                             handleHBPChange,
                             prevPage,
                             spotifyLoginButtonWasPressed
                        })=>(
    <Content padder >

        <Text style={styles.text}>Systolic blood pressure</Text>
        <TextInput  style={styles.input} defaultValue={sbp} onChangeText={handleSBPChange}/>

        <Text style={styles.text}>BMI</Text>
        <TextInput  style={styles.input} defaultValue={bmi} onChangeText={handleBMIChange}/>

        <Text style={styles.text}>High blood pressure</Text>
        <TextInput  style={styles.input} defaultValue={hbp} onChangeText={handleHBPChange}/>


        <TouchableHighlight onPress={spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
            <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={prevPage} style={styles.spotifyLoginButton}>
            <Text style={styles.spotifyLoginButtonText}>Back</Text>
        </TouchableHighlight>
    </Content>

);

const styles = StyleSheet.create({
    IMAGSTitle:{
        flex: 1,

        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {

        backgroundColor: 'rgb(4,4,4)',
        // justifyContent: 'center',
        flex: 1
        // flexDirection: 'column',
    },
    top:{
        height: 72,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },

    IMAGSIcon: {
        width: 40,
        height: 40,
    },
    mid:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'stretch',
    },
    bottom:{
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'flex-end',
    },
    formBox:{
        borderWidth:5,
        borderColor: 'rgba(100, 100, 100, 0.70)',
        marginBottom: 20,
        backgroundColor: 'rgba(50, 50, 50, 0.70)',
    },
    loadMessage: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
    },
    spotifyLoginButton: {
        borderRadius: 18,
        alignItems: 'center',
        backgroundColor: 'green',
        overflow: 'hidden',
        width: 200,
        height: 40,
        margin: 20
    },
    spotifyLoginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    input:{
        borderRadius:10,
        backgroundColor: 'rgba(100, 100, 100, 0.70)',
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
export default DynamicDataForm;