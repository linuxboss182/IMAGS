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
import prefs from 'react-native-shared-preferences'

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
        songStates : [],
        songAttributes : [],
        //-1 before any song states occour, first song state is 0
        curSongState : -1,
        songIDs : []
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
        this.medEventHandler = this.medEventHandler.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.sessionStart = this.sessionStart.bind(this);
        this.sessionEnd = this.sessionEnd.bind(this);
        this.onMedYes = this.onMedYes.bind(this);
        this.onMedNo = this.onMedNo.bind(this);
    }

    painEventHandler(type){
        var newPainEvent = {eventType:type,date:new Date().getTime(),pain:this.state.pain, songState: this.state.curSongState}
        var newEvents = this.state.events.concat(newPainEvent);

        //Update state
        this.setState({
            events: newEvents,
            lastRecordedPain: this.state.pain
        });
    }

    songEventHandler(event, type){

        //create new playbackEvent
        var newPlaybackEvent = {eventType: type, date:new Date().getTime(), pain:this.state.pain, songState: this.state.curSongState};
        //add to events
        var newEvents = this.state.events.concat(newPlaybackEvent);

        //create new songState
        this.setState({curSongState:this.state.curSongState+=1})

        var newSongState = {id: this.state.curSongState, state: event.state, songID: (event.metadata.currentTrack != null ? event.metadata.currentTrack.uri : -1)}
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

        //If there is a track
        if(event.metadata.currentTrack!=null) {
            //if song uri is unique, add it to songIDs
            var songAlreadyExists = this.state.songIDs.some(function (o) {
                return o["songID"] == event.metadata.currentTrack.uri
            })

            if (!songAlreadyExists) {
                //add to songIDs
                var curSongIDs = this.state.songIDs
                curSongIDs[event.metadata.currentTrack.uri] = event.metadata.currentTrack
                this.setState({
                    songIDs: curSongIDs
                });
                //add to song attributes


                //if uri exists, get id from URI
                if(event.metadata.currentTrack.uri!=null) {
                    let songID = event.metadata.currentTrack.uri.substring(14)

                    var attributePromise = Spotify.getTrackAudioFeatures(songID)
                    attributePromise.then( (attributes)=> {
                        var curSongAttributes = this.state.songAttributes



                        curSongAttributes[event.metadata.currentTrack.uri] = attributes

                        console.log(curSongAttributes)

                        this.setState({
                            songAttributes: curSongAttributes
                        });
                    })
                }




            }
        }





    }

    medEventHandler(tookMed){
        var newMedEvent = {eventType: 'medEvent', data:new Date().getTime(), tookMed:tookMed, pain:this.state.pain, songState:this.state.curSongState}
        var newEvents = this.state.events.concat(newMedEvent);
        console.log(newEvents)

        //Update state
        this.setState({
            events: newEvents
        }, prefs.getItem("key",(val)=>{this.sendDataToFirebase(val)}));

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
                this.painEventHandler('painChange');
            }
        }
    }

    sessionStart(){
        this.setState({beforeSession: false, inSession: true});
        this.painEventHandler('sessionStart')
    }

    sessionEnd(){
        this.setState({inSession: false, afterSession: true});
        this.painEventHandler('sessionEnd');
    }


    sendDataToFirebase(pKey){

        const sessionsRef = firebase.database().ref('sessions');

            const session = {
                events: this.state.events,
                songStates: this.state.songStates,
                songIDs : this.state.songIDs,
                songAttributes : this.state.songAttributes,
                participant : pKey
            };

            let sessionKey = sessionsRef.push(session).key;

            //add session key to participant
            const participantSessions = firebase.database().ref('staticParticipantInfo').child(pKey).child("sessions");
            // participantSessions.append(sessionKey)
            //
            // firebase.database().ref('staticParticipantInfo').child(pKey).child("sessions").set(participantSessions,()=>{console.log("Done Updating")})
            var attrRef = firebase.database().ref('songAttributes');


            for(var a in this.state.songAttributes){
                attrRef.child(a).set(this.state.songAttributes[a])
            }


            this.setState({
                events: [],
                songStates :[],
                songIDs: this.state.songIDs,
                songAttributes :[]
            });

    }

    onMedYes(){
        this.setState({afterSession: false, initialSession: false})
        this.medEventHandler(true)
    }

    onMedNo(){
        this.setState({afterSession: false, initialSession: false})
        this.medEventHandler(false)
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
                            onYes={this.onMedYes}
                            onNo={this.onMedNo}
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