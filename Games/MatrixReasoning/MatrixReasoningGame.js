import React from 'react';
import {
  View,
  Image,
  AppState,
  AsyncStorage,
} from 'react-native';

import _ from 'lodash';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import randomstring from 'random-string';
import styles from './styles';

import HomeButton from '../../components/HomeButton/HomeButton';
import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';
import Matrix from '../../components/Matrix';
import LoadScreen from '../../components/LoadScreen';
import dogSprite from '../../sprites/dog/dogCharacter';
import gameTiles from './gameTiles';

const Sound = require('react-native-sound');
const GAME_TIME_OUT = 15000;
const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

const LEFT_EDGE = 950;

class MatrixReasoningGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectionTiles: {},
      gameBoardTiles: {},
      trial: 0,
      dog: {
        frameIndex: [0],
      },
      loadingScreen: true,
      devMode: false,
    };
    this.gameCharacters = ['dog', 'hookedCard'];
    this.characterUIDs = this.makeCharacterUIDs(this.gameCharacters);
    this.popSound;
    this.popPlaying = false;
    this.celebrateSound;
    this.celebratePlaying = false;
    this.disgustSound;
    this.disgustPlaying = false;
  }

  componentWillMount () {
    this.readyTrial(0);
    this.loadCharacter();
    AsyncStorage.getItem('@User:pref', (err, result) => {
      console.log(`GETTING = ${JSON.stringify(result)}`);
      const prefs = JSON.parse(result);
      if (prefs) {
        this.setState({ devMode: prefs.developMode });
      }
      setTimeout(() => this.startInactivityMonitor(), 500);
    });
  }

  componentDidMount () {
    this.initSounds();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount () {
    this.releaseSounds();
    clearInterval(this.matrixShifterInterval);
    clearTimeout(this.readyTrialTimeout);
    clearTimeout(this.timeoutGameOver);
  }
  
  startInactivityMonitor () {
    if (!this.state.devMode) {
      this.timeoutGameOver = setTimeout(() => {
        this.props.navigator.replace({
          id: "Main",
        });
        // game over when 15 seconds go by without bubble being popped
      }, GAME_TIME_OUT);
    }
  }

  initSounds () {
    this.popSound = new Sound('pop_touch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.popSound.setSpeed(1);
      this.popSound.setNumberOfLoops(0);
      this.popSound.setVolume(1);
    });
    this.celebrateSound = new Sound('celebrate.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.celebrateSound.setSpeed(1);
      this.celebrateSound.setNumberOfLoops(0);
      this.celebrateSound.setVolume(1);
    });
    this.disgustSound = new Sound('disgust.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.disgustSound.setSpeed(1);
      this.disgustSound.setNumberOfLoops(0);
      this.disgustSound.setVolume(0.9);
    });
  }

  releaseSounds () {
    this.popSound.stop();
    this.popSound.release();
    this.celebrateSound.stop();
    this.celebrateSound.release();
    this.disgustSound.stop();
    this.disgustSound.release();
  }

  _handleAppStateChange = (appState) => {
    // release all sound objects
    if (appState === 'inactive' || appState === 'background') {
      this.releaseSounds();
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
  }

  loadCharacter () {
    let dog = _.cloneDeep(this.state.dog);
    dog.frameIndex = _.concat(
      dogSprite.animationIndex('ALL'),
      dogSprite.animationIndex('IDLE')
    );
    this.setState({ dog });
  }

  makeCharacterUIDs () {
    return _.zipObject(this.gameCharacters,
      _.map(this.gameCharacters, ()=> randomstring({ length: 7 })));
  }

  spriteSize (sprite, scale) {
    return _.mapValues(sprite.size, (val) => val * scale);
  }

  dogSize (dogScale = 1.25) {
    return this.spriteSize(dogSprite, dogScale * this.props.scale.image);
  }

  dogStartLocation () {
    const size = this.dogSize();
    const left = LEFT_EDGE * this.props.scale.screenWidth;
    const top = SCREEN_HEIGHT - size.height - 60 * this.props.scale.screenHeight;
    return {top, left};
  }

  readyTrial (trial) {
    this.setState({
      trial,
      gameBoardTiles: gameTiles.gameBoardTilesForTrial(trial),
      selectionTiles: gameTiles.selectionTilesForTrial(trial),
    });
  }

  gameCharacterAction (action) {
    if (!this.celebratePlaying && (action === 'CELEBRATE')) {
      this.celebratePlaying = true;
      this.celebrateSound.play(() => {this.celebratePlaying = false;});
    }
    if (!this.disgustPlaying && (action === 'DISGUST')) {
      this.disgustPlaying = true;
      this.disgustSound.play(() => {this.disgustPlaying = false;});
    }
    let dog = _.cloneDeep(this.state.dog);
    dog.frameIndex = _.concat(
      dogSprite.animationIndex(action),
      dogSprite.animationIndex(action)
    );
    this.setState({ dog }, 
      () => {
        this.readyTrialTimeout = setTimeout(() => {
          this.readyTrial(this.state.trial + 1);
      }, 2000);
    });

  }

  leverLocation (scale) {
    const size = this.leverSize(scale);
    const left = SCREEN_WIDTH - size.width;
    const top = (SCREEN_HEIGHT - size.height) / 2;
    return {top, left};
  }

  pressStub () {}

  selectionTilePress (tile, index) {
    if (!this.popPlaying) {
      this.popPlaying = true;
      this.popSound.play(() => {this.popPlaying = false;});
    }
    const trial = this.state.trial;
    if (tile.frameKey === gameTiles.correctSelection(trial)) {
      // redraw matrix with correct
      this.setState({
        gameBoardTiles: gameTiles.gameBoardTilesWithSelectionResult(trial, tile.frameKey),
      });
      this.gameCharacterAction('CELEBRATE');
    } else {
      this.gameCharacterAction('DISGUST');
    }
    clearTimeout(this.timeoutGameOver);
    this.startInactivityMonitor();
  }

  onLoadScreenFinish () {
    this.setState({loadingScreen: false});
  }

  selectionTilePressIn (tile, index) {}
  selectionTilePressOut (tile, index) {}
  gameBoardTilePress (tile, index) {}

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../../media/backgrounds/Game_4_Background_1280.png')} style={{
          width: 1280 * this.props.scale.screenWidth,
          height: 800 * this.props.scale.screenHeight,
          flex: 1,
        }}
        />
        <AnimatedSprite
          sprite={dogSprite}
          spriteUID={this.characterUIDs.dog}
          animationFrameIndex={this.state.dog.frameIndex}
          loopAnimation={false}
          tweenOptions={{}}
          tweenStart={'fromMethod'}
          coordinates={this.dogStartLocation()}
          onTweenFinish={(characterUID) => this.onCharacterTweenFinish(characterUID)}
          size={this.dogSize()}
          rotate={[{rotateY:'0deg'}]}
          onPress={() => this.pressStub()}
          onPressIn={() => this.pressStub()}
          onPressOut={() => this.pressStub()}
        />

        <Matrix
          styles={{
            top: 40 * this.props.scale.screenHeight,
            left: 900 * this.props.scale.screenWidth,
            position: 'absolute',
            width: 600 * this.props.scale.screenWidth,
            height: 600 * this.props.scale.screenHeight,
          }}
          tileScale={0.9}
          tiles={this.state.selectionTiles}
          scale={this.props.scale}
          onPress={(tile, index) => this.selectionTilePress(tile, index)}
          onPressIn={(tile, index) => this.selectionTilePressIn(tile, index)}
          onPressOut={(tile, index) => this.selectionTilePressOut(tile, index)}
        />

        <Matrix
          styles={{
            top: 40 * this.props.scale.screenHeight,
            left: 300 * this.props.scale.screenWidth,
            position: 'absolute',
            width: 600 * this.props.scale.screenWidth,
            height: 600 * this.props.scale.screenHeight,
          }}
          tileScale={1.5}
          tiles={this.state.gameBoardTiles}
          scale={this.props.scale}
          onPress={(tile, index) => this.gameBoardTilePress(tile, index)}
        />

        {this.state.devMode ?
          <HomeButton
            route={this.props.route}
            navigator={this.props.navigator}
            routeId={{ id: 'Main' }}
            styles={{
              width: 150 * this.scale.image,
              height: 150 * this.scale.image,
              top:0, left: 0, position: 'absolute' }}
          />
        : null}

        {this.state.loadingScreen ?
          <LoadScreen
            onTweenFinish={() => this.onLoadScreenFinish()}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
          />
        : null}
      </View>
    );
  }

}

MatrixReasoningGame.propTypes = {
  route: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  scale: React.PropTypes.object.isRequired,
};

reactMixin.onClass(MatrixReasoningGame, TimerMixin);

export default MatrixReasoningGame;
