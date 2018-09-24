/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

var { InitialScreen } = require("./InitialScreen.js");
var { MainScreen } = require("./MainScreen.js");


export default App = StackNavigator({
    initial: { screen:InitialScreen },
    main: { screen:MainScreen },
},{
    headerMode: 'screen',
});
