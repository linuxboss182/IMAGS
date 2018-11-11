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
import firebase from './comps/firebase.js';

const PAIN_RECORD_THRESHOLD = .5;

export class MainScreen extends Component {

    state = {
        pain: 5,
        lastRecordedPain: -1,
        spotifyUserName: null,
        playing: false,
        shuffling: false,
        repeating: false,
        initialSession: true,
        beforeSession: false,
        inSession: false,
        afterSession: false,
        events : [],
        songStates : []
        // track: {
        //     id: "3FCto7hnn1shUyZL42YgfO",
        //     album: {images: [{url: "https://i.scdn.co/image/05adfbc8914bec4983675dec65c514dcab13beb6"}]},
        //     name: "Piano Man",
        //     artists: [{name: "Billy Joel"}]
        // }
    };

    constructor()
    {
        super();

        this.spotifyLogoutButtonWasPressed = this.spotifyLogoutButtonWasPressed.bind(this);
        this.searchSong = this.searchSong.bind(this);
        this.songEventHandler = this.songEventHandler.bind(this);
        this.painEventHandler = this.painEventHandler.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.sessionStart = this.sessionStart.bind(this);
        this.sessionEnd = this.sessionEnd.bind(this);
    }

    painEventHandler(pain, type){
        var newPainEvent = {eventType:type,date:new Date().getTime(),pain:pain}
        var newEvents = this.state.events.concat(newPainEvent);

        //Update state
        this.setState({
            events: newEvents,
            lastRecordedPain: pain
        });
    }

    songEventHandler(event, type){
        //create new playbackEvent
        var newPlaybackEvent = {eventType: type, date:new Date().getTime()};
        //add to events
        var newEvents = this.state.events.concat(newPlaybackEvent);

        //create new songState
        var newSongState = {state: event.state, track: event.metadata.currentTrack}
        //add to SongStates
        var newSongStates = this.state.songStates.concat(newSongState)
        //Update state
        this.setState({
            playing: event.state.playing,
            shuffling: event.state.shuffling,
            repeating: event.state.repeating,
            events: newEvents,
            songStates: newSongStates
        });
    }

    componentDidMount()
    {
        //Listeners for spotify events
        Spotify.addListener('metadataChange', (event)=>{ this.songEventHandler(event,'metadataChange')});
        Spotify.addListener('play', (event)=>{ this.songEventHandler(event,'play')});
        Spotify.addListener('pause', (event)=>{ this.songEventHandler(event,'pause')});
        Spotify.addListener('shuffleStatusChange', (event)=>{ this.songEventHandler(event,'shuffleStatusChange')});
        Spotify.addListener('repeatStatusChange', (event)=>{ this.songEventHandler(event,'repeatStatusChange')});

        //Send api request to get user info
        Spotify.getMe().then((result) => {
            // update state with user info
            this.setState({ spotifyUserName: result.display_name });
            // play song
            // return Spotify.playURI("spotify:track:"+this.state.track.id, 0, 0);
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
        Spotify.search(event.nativeEvent.text, ['album', 'artist', 'playlist', 'track']).then((ret) => {
            // success
            this.setState({track: ret.tracks.items[0]}); //Most relevant song
            return Spotify.playURI("spotify:track:" + ret.tracks.items[0].id, 0, 0); //Play the song
        }).catch((error) => {
            // error
            console.log("Error: " + error);
        });
    }

    onSliderChange(pain){
        if(this.state.initialSession){
            this.setState({initialSession: false, beforeSession: true})
        }
        this.setState({pain: pain})

        //only record pain if in session
        if(this.state.inSession) {
            //if there is a significant difference between currect apin and last recorded pain, record pain
            if (Math.abs(this.state.pain - this.state.lastRecordedPain) >= PAIN_RECORD_THRESHOLD) {
                //record pain
                this.painEventHandler(pain, 'painChange');
            }
        }
    }

    sessionStart(){
        this.setState({beforeSession: false, inSession: true});
        this.painEventHandler(this.state.pain,'sessionStart')
    }

    sessionEnd(){
        this.setState({inSession: false, afterSession: true});
        this.painEventHandler(this.state.pain,'sessionEnd');

        const sessionsRef = firebase.database().ref('sessions');
        const session = {
            events: this.state.events,
            songStates: this.state.songStates
        };
        sessionsRef.push(session);

        this.setState({
            events: []
        });

    }

    render() {
        return (
        <View style={styles.container}>
            <Header onLogoutPress={this.spotifyLogoutButtonWasPressed}
                    onSearch={this.searchSong}/>

            <Art url={this.state.track ? this.state.track.album.images[0].url : null} />

            <Track title={this.state.track ? this.state.track.name : null}
                   artist={this.state.track ? this.state.track.artists[0].name : null}/>

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
                            onBegin= {this.sessionStart}
                            onEnd={this.sessionEnd}
                            onYes={()=> this.setState({afterSession: false, initialSession: false})}
                            onNo={()=> this.setState({afterSession: false, initialSession: false})}
                            onCancel={()=> this.setState({afterSession: false, inSession: true})}
            />

            <PainSlider pain={this.state.pain}
                        onValueChange={this.onSliderChange} />

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