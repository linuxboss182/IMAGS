
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Spotify from 'rn-spotify-sdk';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Body,
    Left,
    Right,
    Input,
    Item,
    Form
} from "native-base";

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
                    <Header>
                        <Body>
                        <Title>IMAGS</Title>
                        </Body>
                        <Right />
                    </Header>
                    {this.state.loginSuccessful ?
                        <Text style={styles.text}>
                            An error occurred. You may need Spotify Premium.
                        </Text> :
                        <Text style={styles.text}>

                        </Text>

                    }
                    <Container style={styles.mid}>
                        <Content padder >
                            <Form style={styles.textboxes}>
                                <Item regular>
                                    <Input placeholder="Name" />
                                </Item>
                            </Form>
                            <Form style={styles.textboxes}>
                                <Item regular>
                                    <Input placeholder="Date of Birth" />
                                </Item>
                            </Form>
                            <Form style={styles.textboxes}>
                                <Item regular>
                                    <Input placeholder="Participant ID" />
                                </Item>
                            </Form>
                        </Content>
                    </Container>
                    <Container style={styles.bottom}>
                    <TouchableHighlight onPress={this.spotifyLoginButtonWasPressed} style={styles.spotifyLoginButton}>
                        <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
                    </TouchableHighlight>
                    </Container>
                </View>
            );
         }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        // justifyContent: 'center',
        flex: 1,
        // flexDirection: 'column',
    },
    mid:{
        marginTop: 150,
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'stretch',
    },
    bottom:{
        backgroundColor: 'rgb(4,4,4)',
        alignItems: 'flex-end',
    },
    textboxes:{
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
        backgroundColor: 'green',
        overflow: 'hidden',
        width: 200,
        height: 40,
        margin: 20,
    },
    spotifyLoginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    }
});