import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from "react-native";
import Spotify from 'rn-spotify-sdk';
import { StackActions, NavigationActions } from 'react-navigation';

import Header from './comps/header.js';
import Art from './comps/art.js';
import Control from './comps/control.js';
import Track from './comps/track.js';
import PainSlider from './comps/slider.js';

export class MainScreen extends Component {
    state = {
        pain: 5,
        spotifyUserName: null,
        paused: false,
        track: {
            id: "3FCto7hnn1shUyZL42YgfO",
            album: {images: [{url: "https://i.scdn.co/image/05adfbc8914bec4983675dec65c514dcab13beb6"}]},
            name: "Piano Man",
            artists: [{name: "Billy Joel"}]
        }
    };

    // static navigationOptions = {
    //     title: 'Player',
    // };

    constructor()
    {
        super();

        this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
        this.searchSong = this.searchSong.bind(this);
        this.onPressPause = this.onPressPause.bind(this);
    }

    componentDidMount()
    {
        // Use this to update values on backend
        // Spotify.addListener('metadataChange', (meta) => {
        //         console.log("Meta change: " + meta);
        //     }
        // );

        //Send api request to get user info
        Spotify.getMe().then((result) => {
            // update state with user info
            this.setState({ spotifyUserName: result.display_name });
            // play song
            return Spotify.playURI("spotify:track:"+this.state.track.id, 0, 0);
        }).then((ret) => {
            console.log("ret: " + ret);
            // success
        }).catch((error) => {
            // error
            Alert.alert("Error", error.message);
        });

    }

    goToInitialScreen()
    {
        const navAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'initial'})
            ]
        });
        this.props.navigation.dispatch(navAction);
    }

    spotifyLogoutButtonWasPressed()
    {
        Spotify.logout().finally(() => {
            this.goToInitialScreen();
        });
    }

    searchSong(event){

        Spotify.search(event.nativeEvent.text, ['album','artist','playlist','track']).then((ret) => {
            // success
            this.setState({track: ret.tracks.items[0]}); //Most relevant song
            return Spotify.playURI("spotify:track:"+this.state.track.id, 0, 0); //Play the song
        }).catch((error) => {
            // error
            console.log("Error: "+ error);
        });
    }

    onPressPause(){
        this.setState({paused: !this.state.paused});
        Spotify.setPlaying(this.state.paused);
    }

    render() {
        return (
        <View style={styles.container}>
            <Header onLogoutPress={this.spotifyLogoutButtonWasPressed}
                    onSearch={this.searchSong}/>

            <Art url={this.state.track.album.images[0].url} />

            <Track title={this.state.track.name}
                   artist={this.state.track.artists[0].name} />

            <Control paused={this.state.paused}
                     onPressPause={this.onPressPause}/>

            <PainSlider pain={this.state.pain}
                        onValueChange={(pain) => {this.setState({pain});}} />

            {/*<Text style={styles.text}>Pain: {this.state.pain}</Text>*/}

        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(4,4,4)',
        flex: 1,
        flexDirection: 'column',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
        fontSize: 10
    },
    text: {
        color: 'rgba(255, 255, 255, 0.72)',
        fontWeight: 'bold',
    }
});