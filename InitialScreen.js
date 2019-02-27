
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert, Dimensions, Image,
    StyleSheet,
    Text,
    TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
export class InitialScreen extends Component
{
    static navigationOptions = {
        header: null
    };

    constructor()
    {
        super();

        this.state = {spotifyInitialized: false, loginSuccessful: false};
        this.spotifyLoginButtonWasPressed = this.spotifyLoginButtonWasPressed.bind(this);
    }

    goToPlayer()
    {
        const navAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'main'})
            ]
        });
        this.props.navigation.dispatch(navAction);
    }

    componentDidMount()
    {
        // initialize Spotify if it hasn't been initialized yet
        if(!Spotify.isInitialized())
        {
            // initialize spotify
            var spotifyOptions = {
                "clientID":"8d1411f9635841aeb9b2523482ea5b1a",
                "sessionUserDefaultsKey":"SpotifySession",
                "redirectURL":"http://localhost:8888/callback/",
                "scopes":["user-read-private", "playlist-read", "playlist-read-private", "streaming"],
            };
            Spotify.initialize(spotifyOptions).then((loggedIn) => {
                // update UI state
                this.setState({spotifyInitialized: true});
                // handle initialization
                if(loggedIn)
                {
                    this.goToPlayer();
                }
            }).catch((error) => {
                Alert.alert("Error", error.message);
            });
        }
        else
        {
            // update UI state
            this.setState((state) => {
                state.spotifyInitialized = true;
                return state;
            });
            // handle logged in
            if(Spotify.isLoggedIn())
            {
                this.goToPlayer();
            }
        }
    }

    spotifyLoginButtonWasPressed()
    {

        // log into Spotify
        Spotify.login().then((loggedIn) => {

            if(loggedIn)
            {
                // logged in
                this.goToPlayer();
            }
            else
            {
                // cancelled
                this.setState({loginSuccessful: true});

            }
        }).catch((error) => {
            // error
            Alert.alert("Error", error.message);
        });
    }

    render()
    {
        if(!this.state.spotifyInitialized)
        {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating={true} style={styles.loadIndicator}>
                    </ActivityIndicator>

                    <Text style={styles.loadMessage}>
                        Loading...
                    </Text>
                </View>
            );
        }
        else
        {
            return (
                <View style={styles.container}>
                    <View style={styles.top}>

                        <Image style={styles.IMAGSIcon} source={require('./img/IMAGS_icon.png')} />
                        <Text style={styles.IMAGSTitle}>IMAGS</Text>


                    </View>
                    {this.state.loginSuccessful ?
                        <Text style={styles.text}>
                            An error occurred. You may need Spotify Premium.
                        </Text> :
                        <Text style={styles.text}>

                        </Text>

                    }
                    <View style={styles.mid}>
                        <View padder >


                            <FormLabel>Name</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Age (years)</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Gender</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Race/Ethnicity</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Marital status</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Duration of pain</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>Systolic blood pressure</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>BMI</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>

                            <FormLabel>High blood pressure</FormLabel>
                            <FormInput containerStyle={styles.input} onChangeText={null}/>



                            <TouchableHighlight onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
                                <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
                            </TouchableHighlight>
                        </View>
                    </View>



                </View>
            );
        }
    }
}



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
    }
});