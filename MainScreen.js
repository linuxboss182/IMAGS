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
import SessionControl from './comps/sessionControl.js';

export class MainScreen extends Component {
    state = {
        pain: 5,
        spotifyUserName: null,
        playing: false,
        shuffling: false,
        repeating: false,
        initialSession: true,
        beforeSession: false,
        inSession: false,
        afterSession: false,
        track: {
            id: "3FCto7hnn1shUyZL42YgfO",
            album: {images: [{url: "https://i.scdn.co/image/05adfbc8914bec4983675dec65c514dcab13beb6"}]},
            name: "Piano Man",
            artists: [{name: "Billy Joel"}]
        }
    };

    constructor()
    {
        super();

        this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
        this.searchSong = this.searchSong.bind(this);
        this.metaEventHandler = this.metaEventHandler.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    metaEventHandler(event){
        this.setState({playing: event.state.playing,
            shuffling: event.state.shuffling,
            repeating: event.state.repeating});
    }

    componentDidMount()
    {
        //Listeners for spotify events
        Spotify.addListener('metadataChange', this.metaEventHandler);
        Spotify.addListener('play', this.metaEventHandler);
        Spotify.addListener('pause', this.metaEventHandler);
        Spotify.addListener('shuffleStatusChange', this.metaEventHandler);
        Spotify.addListener('repeatStatusChange', this.metaEventHandler);

        //Send api request to get user info
        Spotify.getMe().then((result) => {
            // update state with user info
            this.setState({ spotifyUserName: result.display_name });
            // play song
            return Spotify.playURI("spotify:track:"+this.state.track.id, 0, 0);
        }).then((ret) => {
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

    onSliderChange(pain){
        if(this.state.initialSession){
            this.setState({initialSession: false, beforeSession: true})
        }
        this.setState({pain: pain})
    }

    render() {
        return (
        <View style={styles.container}>
            <Header onLogoutPress={this.spotifyLogoutButtonWasPressed}
                    onSearch={this.searchSong}/>

            <Art url={this.state.track.album.images[0].url} />

            <Track title={this.state.track.name}
                   artist={this.state.track.artists[0].name} />

            <Control paused={!this.state.playing}
                     shuffleOn={this.state.shuffling}
                     repeatOn={this.state.repeating}
                     onForward={()=> Spotify.skipToNext()}
                     onBack={()=> Spotify.skipToPrevious()}
                     setShuffling={() => Spotify.setShuffling(!this.state.shuffling)}
                     onPressRepeat={() => Spotify.setPlaying(!this.state.repeating)}
                     onPressPause={() => Spotify.setPlaying(!this.state.playing)}
            />

            <SessionControl
                            initialSession={this.state.initialSession}
                            beforeSession={this.state.beforeSession}
                            inSession={this.state.inSession}
                            afterSession={this.state.afterSession}
                            onBegin={()=> this.setState({beforeSession: false, inSession: true})}
                            onEnd={()=> this.setState({inSession: false, afterSession: true})}
                            onYes={()=> this.setState({afterSession: false, initialSession: false})}
                            onNo={()=> this.setState({afterSession: false, initialSession: false})}
                            onCancel={()=> this.setState({afterSession: false, inSession: true})}
            />

            <PainSlider pain={this.state.pain}
                        onValueChange={this.onSliderChange} />

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