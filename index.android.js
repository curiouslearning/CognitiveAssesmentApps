/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React from 'react';
import {
  AppRegistry,
  Dimensions,
} from 'react-native';

import {Navigator} from 'react-native-deprecated-custom-components';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import Main from "./main";
import Prefs from './prefs';
import BubblesGame from './Games/Bubbles/BubblesGame';
import BugZapGameRedesign from './Games/BugZap/BugZapRedesign';
import MatchByColorGame from './Games/MatchByColor/MatchByColorGame';
import MatrixReasoningGame from './Games/MatrixReasoning/MatrixReasoningGame';
import SymbolDigitCodingGame from './Games/SymbolDigitCoding/SymbolDigitCodingGame';
import UnlockFoodGame from './Games/UnlockFood/UnlockFoodGame';

const Sound = require('react-native-sound');

const baseHeight = 800;
const baseWidth = 1280;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class CogPlay extends React.Component {
  constructor (props) {
    super(props);
    const scaleWidth =  screenWidth / baseWidth ;
    const scaleHeight = screenHeight / baseHeight ;
    this.scale = {
      screenWidth: scaleWidth,
      screenHeight: scaleHeight,
      image: scaleHeight > scaleWidth ? scaleWidth : scaleHeight,
    };
    this.ambient;
  }

  componentDidMount () {
    // Note that file location is always relative to android/app/src/main/res/raw
    // this.ambient = new Sound('ambient_swamp.mp3', Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     console.warn('failed to load the sound', error);
    //     return;
    //   }
    //   // console.warn('duration in seconds: ' + this.ambient.getDuration() + 'number of channels: ' + this.ambient.getNumberOfChannels());
    //   this.ambient.setSpeed(1);
    //   this.ambient.setNumberOfLoops(-1);
    //   this.ambient.play((success) => {
    //     if (success) {
    //       console.warn('successfully finished playing');
    //     } else {
    //       console.warn('playback failed due to audio decoding errors');
    //     }
    //   });
    //   this.ambient.setVolume(1);
    // });
  }

  componentWillUnmount () {
    console.error('unmount index.android')
  }

  endAudio () {
    // this.ambient.stop();
    // this.ambient.release();
  }

  renderScene (route, navigator) {
    if (route.id !== 'Main') {
      this.endAudio();
    }

    if (route.id === 'Main') {
      return <Main
        navigator={navigator}
        route={route}
        scale={this.scale}
      />;
    } else if (route.id === 'BubblesGame') {
      return (
        <BubblesGame
          navigator={navigator}
          route={route}
          scale={this.scale}
        />);
    } else if (route.id === 'BugZapGame') {
      return (
        <BugZapGameRedesign
          navigator={navigator}
          route={route}
          scale={this.scale}
        />);
    } else if (route.id === 'MatchByColorGame') {
      return (
        <MatchByColorGame
          navigator={navigator}
          route={route}
          scale={this.scale}
        />);
    } else if (route.id === 'MatrixReasoningGame') {
      return (
        <MatrixReasoningGame
          navigator={navigator}
          route={route}
          scale={this.scale}
        />);
    } else if (route.id === 'SymbolDigitCodingGame') {
      return (
        <SymbolDigitCodingGame
          navigator={navigator}
          route={route}
          scale={this.scale}
        />);
    } else if (route.id === 'UnlockFoodGame') {
      return (<UnlockFoodGame
        navigator={navigator}
        route={route}
        scale={this.scale}
      />);
    } else if (route.id === 'Prefs') {
      return (<Prefs
        navigator={navigator}
        route={route}
        scale={this.scale}
      />);
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{name: 'Game Launcher', id: 'Main'}}
          renderScene={(route, navigator) => {
            return this.renderScene(route, navigator);
        }}
      />
    );
  }
}

reactMixin.onClass(CogPlay, TimerMixin);

AppRegistry.registerComponent('CogPlay', () => CogPlay);
