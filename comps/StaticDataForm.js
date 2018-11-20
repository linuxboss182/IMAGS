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
import {Container, Content} from "native-base";

const StaticDataForm = ({
                            name,
age,
gender,
race,
marital,
painDur,

handleNameChange,
handleAgeChange,
handleGenderChange,
handleRaceChange,
handleMaritalChange,
handlePainDurChange,
    nextPage,
    prevPage




})=>(
    <Container style={styles.mid}>

    <Content padder >



        <Text style={styles.text}>Name</Text>
        <TextInput  style={styles.input} defaultValue={name} onChangeText={handleNameChange}/>

        <Text style={styles.text}>Age (years)</Text>
        <TextInput  style={styles.input} defaultValue={age} onChangeText={handleAgeChange}/>

        <Text style={styles.text}>Gender</Text>
        <TextInput  style={styles.input} defaultValue={gender} onChangeText={handleGenderChange}/>

        <Text style={styles.text}>Race/Ethnicity</Text>
        <TextInput  style={styles.input} defaultValue={race} onChangeText={handleRaceChange}/>

        <Text style={styles.text}>Marital Status</Text>
        <TextInput  style={styles.input} defaultValue={marital} onChangeText={handleMaritalChange}/>

        <Text style={styles.text}>Duration of Pain</Text>
        <TextInput  style={styles.input} defaultValue={painDur} onChangeText={handlePainDurChange}/>

        <TouchableHighlight onPress={nextPage} style={styles.nextPageButton}>
            <Text style={styles.spotifyLoginButtonText}>Continue</Text>
        </TouchableHighlight>

    </Content>
    </Container>
);

const styles = StyleSheet.create({
    nextPageButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#226FB2',
        borderRadius:10,
    },

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
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'green',
        borderRadius:10
    },
    spotifyLoginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    input:{
        borderRadius:10,
        backgroundColor: 'rgba(100, 100, 100, 0.70)',
        color: 'rgba(255, 255, 255, 0.72)'

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
export default StaticDataForm;