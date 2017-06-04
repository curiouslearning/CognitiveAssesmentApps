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

import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';
import HomeButton from '../../components/HomeButton/HomeButton';
import Matrix from '../../components/Matrix';
import LoadScreen from '../../components/LoadScreen';

import leverSprite from '../../sprites/lever/leverCharacter';
import birdSprite from "../../sprites/bird/birdCharacter";
import foodSprite from "../../sprites/apple/appleCharacter";
import foodMachineSprite from "../../sprites/foodMachine/foodMachineCharacter";
import beltSprite from "../../sprites/conveyorBelt/beltCharacter";
import ledSprite from "../../sprites/led/ledCharacter";
import buttonSprite from "../../sprites/button/buttonCharacter";
import arrowSprite from "../../sprites/arrow/arrowCharacter";
import lightbulbCharacter from "../../sprites/lightbulb/lightbulbCharacter";

import gameTiles from './gameTiles';
import styles from "./styles";
import gameUtil from './gameUtil';

const GAME_TIME_OUT = 15000;
const Sound = require('react-native-sound');
const SCREEN_WIDTH = require ('Dimensions').get('window').width;
const SCREEN_HEIGHT = require ('Dimensions').get('window').height;

// each level starts at the assigned trial number
const LEVEL_1A = 0;
const LEVEL_1B = 0;

const LEVEL_2A = 4;
const LEVEL_2B = 7;
const LEVEL_3 = 10;
const LEVEL_4 = 13;

class UnlockFoodGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      leverAnimationIndex: [0],
      buttonAnimationIndex: [0],
      birdAnimationIndex: [0],
      machineAnimationIndex: [0],
      arrowAnimationIndex: [0],
      ledAnimationIndex: [0],
      beltAnimationIndex: [0],
      lightbulbAnimationIndex: [0],
      showFood: true,
      tiles: {},
      trial: 0,
      loadingScreen: true,
      blackout: false,
      lightbulbTweenOptions: null,
      lightbulbImgIndex: 0,
      lightbulbDisplayed: false,
      arrowIndex: 1,
      leds: gameTiles.ledController([], 3),
      devMode: false,
    };
    this.ledsOn = [];
    this.numLeds = 3;
    this.numPresses = 0; // NOTE: temperary

    this.scale = this.props.scale;
    this.characterUIDs = {};
    this.setDefaultAnimationState;
    this.bird = {tweenOptions: {}};
    this.foodSprite = {
      tweenOptions: {},
      coords: {top: 0, left: 0},
    };
    this.reverseOrder = false;
    this.remainingTilesInSeq  = 0;
    this.waitForUserSeq = false;
    this.pressSequence = [];
    this.btnTimeout;
    this.blinkTimeout;
    this.blinkTimeoutArray = [];
    this.leverSound;
    this.leverPlaying = false;
    this.celebrateSound;
    this.celebratePlaying = false;
    this.topToneSound;
    this.topTonePlaying = false;
    this.middleToneSound;
    this.middleTonePlaying = false;
    this.bottomSound;
    this.bottomPlaying = false;
    this.disgustSound;
    this.disgustPlaying = false;
  }

  componentWillMount () {
    this.characterUIDs = {
      fruit: randomstring({ length: 7 }),
      lever: randomstring({ length: 7 }),
      machine: randomstring({ length: 7 }),
      belt: randomstring({ length: 7 }),
      led: randomstring({ length: 7 }),
      button: randomstring({ length: 7 }),
      arrow: randomstring({ length: 7 }),
      lightbulb: randomstring({ length: 7 }),
      bird: randomstring({ length: 7 }),
    };

    this.setState({
      buttonAnimationIndex: buttonSprite.animationIndex('ALL'),
      birdAnimationIndex: birdSprite.animationIndex('ALL'),
      machineAnimationIndex: foodMachineSprite.animationIndex('ALL'),
      arrowAnimationIndex: arrowSprite.animationIndex('ALL'),
      ledAnimationIndex: ledSprite.animationIndex('ALL'),
      leverAnimationIndex: leverSprite.animationIndex('ALL'),
      beltAnimationIndex: beltSprite.animationIndex('ALL'),
    });

    this.nextTrial(this.state.trial);

    this.foodSprite.coords = this.foodStartLocation();
    const beltCoords = this.conveyorBeltLocation();
    const birdMouthLoc = this.birdMouthLocation();
    const pastBelt = 50 * this.props.scale.screenWidth;
    this.foodSprite.tweenOptions = {
      tweenType: 'sine-wave',
      startXY: [this.foodSprite.coords.left, this.foodSprite.coords.top],
      xTo: [beltCoords.left - pastBelt, birdMouthLoc.left],
      yTo: [this.foodSprite.coords.top, birdMouthLoc.top],
      duration: 1500,
      loop: false,
    };
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
    clearInterval(this.eatInterval);
    clearTimeout(this.timeoutGameOver);
    clearTimeout(this.celebrateTimeout);
    clearTimeout(this.setDefaultAnimationState);
    clearTimeout(this.btnTimeout);
    clearInterval(this.matrixShifterInterval);
    clearTimeout(this.blinkTimeout);
    clearTimeout(this.timeoutGameOver);
    _.forEach(this.blinkTimeoutArray, blinkTimeout => clearTimeout(blinkTimeout));
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
    this.celebrateSound = new Sound('celebrate.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.celebrateSound.setSpeed(1);
      this.celebrateSound.setNumberOfLoops(0);
      this.celebrateSound.setVolume(1);
    });
    this.leverSound = new Sound('lever_switch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.leverSound.setSpeed(1);
      this.leverSound.setNumberOfLoops(0);
      this.leverSound.setVolume(1);
    });
    // init tones
    this.topToneSound = new Sound('tone_3.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.topToneSound.setSpeed(1);
      this.topToneSound.setNumberOfLoops(0);
      this.topToneSound.setVolume(1);
    });
    this.middleToneSound = new Sound('tone_2.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.middleToneSound.setSpeed(1);
      this.middleToneSound.setNumberOfLoops(0);
      this.middleToneSound.setVolume(1);
    });
    this.bottomToneSound = new Sound('tone_1.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.bottomToneSound.setSpeed(1);
      this.bottomToneSound.setNumberOfLoops(0);
      this.bottomToneSound.setVolume(1);
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
    this.leverSound.stop();
    this.leverSound.release();
    this.celebrateSound.stop();
    this.celebrateSound.release();
    this.topToneSound.stop();
    this.topToneSound.release();
    this.middleToneSound.stop();
    this.middleToneSound.release();
    this.bottomToneSound.stop();
    this.bottomToneSound.release();
    this.disgustSound.stop();
    this.disgustSound.release();
  }

  _handleAppStateChange = (appState) => {
    // release all sound objects
    if (appState === 'inactive' || appState === 'background') {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
  }

  nextTrial (trial) {
    console.log("TRIAL = ", trial);
    this.reverseOrder = false;
    let arrowIndex = 1;
    if ( ((trial >= LEVEL_2A) && (trial < LEVEL_3)) || trial >= LEVEL_4) {
      /// 4 7 13
      console.log("REVERSE THINGS")
      this.reverseOrder = true;
      arrowIndex = 0;
    }
    if (trial >= LEVEL_3 ) {
      this.showLightbulb();
    }
    this.setState({
      trial,
      arrowIndex,
      tiles: gameTiles.gameBoardTilesForTrial(trial),
    });
  }

  foodStartLocation () {
    // machine location - machine size
    const beltCoords = this.conveyorBeltLocation();
    const beltSize = this.conveyorBeltSize();
    const foodSize = this.foodSize();
    const coords = {
      top: beltCoords.top - foodSize.height,
      left: beltCoords.left + beltSize.width,
    };
    return coords;
  }

  birdMouthLocation () {
    const birdLoc = this.birdEndLocation();
    const birdSize = this.birdSize();
    const left = birdLoc.left + birdSize.width * 0.6;
    const top = birdLoc.top + birdSize.height * 0.6;
    return {top, left};
  }

  foodSize () {
    // scale to 120 x 120 or closest.
    const scale = 1;
    return ({
        width: foodSprite.size.width * scale * this.scale.image,
        height: foodSprite.size.height * scale * this.scale.image,
      }
    );
  }

  conveyorBeltEndLocation () {
    const beltLocation = this.conveyorBeltLocation();
    const beltSize = this.conveyorBeltSize();
    const foodSize = this.foodSize();
    const left = beltLocation.left-(foodSize.width/2);
    const top = beltLocation.top - (beltSize.height * 1.42);
    return {top, left};
  }

  onFoodTweenFinish () {
    this.foodSprite.coords = this.foodStartLocation();
    this.setState({
      showFood: false,
    });
  }

  leverPressIn () {
    if (this.waitForUserSeq) return;

    if (!this.leverPlaying) {
      this.leverPlaying = true;
      this.leverSound.play(() => {this.leverPlaying = false;});
    }

    if (this.state.trial >= LEVEL_3) {
      this.setState({
        blackout: true,
        lightbulbImgIndex: 1,
      });
    }

    const blinkSeq = gameTiles.tileBlinkSequence(this.state.trial);
    this.setState({
      leverAnimationIndex: leverSprite.animationIndex('SWITCH_ON'),
    });
    this.leverOn = true;
    this.blink(blinkSeq);
    clearTimeout(this.timeoutGameOver);
    this.startInactivityMonitor();
  }

  blink (blinkSeq) {
    this.remainingTilesInSeq = blinkSeq.length;

    _.forEach(blinkSeq, (blinkIndex, index) => {
      const blinkTimeout = setTimeout(()=> {
        const tiles = _.cloneDeep(this.state.tiles);

        _.forEach(tiles, tile => tile.frameKey = 'IDLE');
        this.playTilePressSound(blinkIndex);
        tiles[blinkIndex].frameKey = 'BLINK_0';
        if (this.leverOn) {
          this.setState({ tiles }, () => {
            tiles[blinkIndex].frameKey = 'IDLE';
            this.remainingTilesInSeq = this.remainingTilesInSeq - 1;
            if (this.remainingTilesInSeq === 0) {
              this.waitForUserSeq = true;
              this.activeGameboard = true;
              setTimeout(() => {
                this.setState({
                  blackout: false,
                  lightbulbImgIndex: 0,
                });
              }, 500);
            }
          });
        }
      }, (400 + 600 * index));
      this.blinkTimeoutArray.push(blinkTimeout);
    });

  }

  leverPressOut () {
    this.leverOn = false;
    // NOTE: do not like this solution but have issue with async state change.
    // it is possilbe for
    this.pressSequence = [];
    _.forEach(this.blinkTimeoutArray, blinkTimeout => clearTimeout(blinkTimeout));

    const tiles = gameTiles.gameBoardTilesForTrial(this.state.trial);
    // if we have not completed the sequence we reset switch to off.
    let animationIndex;
    if (this.remainingTilesInSeq > 0) {
      animationIndex = leverSprite.animationIndex('SWITCH_OFF');
      this.waitForUserSeq = false;
    } else {
      animationIndex = leverSprite.animationIndex('SWITCH_ON');
    }
    this.setState({
      tiles,
      blackout: false,
      lightbulbImgIndex: 0,
      leverAnimationIndex: animationIndex,
    });
  }

  leverSize () {
    const scaleLever = 1.25;
    return ({
      width: leverSprite.size.width * scaleLever * this.scale.image,
      height: leverSprite.size.height * scaleLever * this.scale.image,
    });
  }

  leverLocation () {
    const locationMachine = this.machineLocation();
    const machineSize = this.machineSize();
    const leftOffset = (15 * this.scale.screenWidth);
    const left = locationMachine.left + machineSize.width - leftOffset;
    const top = SCREEN_HEIGHT - machineSize.height;

    return {top, left};
  }

  machineSize () {
    return ({
      width: foodMachineSprite.size.width * this.scale.image,
      height: foodMachineSprite.size.height * this.scale.image,
    });
  }

  machineLocation () {
    //placement for food machine
    const machineSize = this.machineSize();
    const leverSize = this.leverSize();
    const leftOffset = 20 * this.scale.screenWidth;
    const left = ((SCREEN_WIDTH - machineSize.width) - leverSize.width - leftOffset);
    const top = ((SCREEN_HEIGHT - machineSize.height));
    return ({top, left});
  }

  directionArrowLocation () {
    const mloc = this.machineLocation();
    const msize = this.machineSize();
    const top = mloc.top + 20 * this.scale.screenHeight;
    const left = mloc.left + msize.width/2 - ((110/2) * this.scale.image);
    return {top, left};
  }

  conveyorBeltSize () {
    const scaleBelt = 1;
    return ({
      width: beltSprite.size.width * scaleBelt * this.scale.image,
      height: beltSprite.size.height * scaleBelt * this.scale.image,
    });
  }

  conveyorBeltLocation () {
    const locationMachine = this.machineLocation();
    const machineSize = this.machineSize();
    const leftOffset = 283 * this.scale.screenWidth;
    const left = locationMachine.left - machineSize.width + leftOffset;
    const top = SCREEN_HEIGHT - (machineSize.height * 0.53);
    return {top, left};
  }

  ledSize () {
    const scaleLed = 1;
    return ({
      width: ledSprite.size.width * scaleLed * this.scale.image,
      height: ledSprite.size.height * scaleLed * this.scale.image,
    });
  }

  ledLocation () {
    const locationMachine = this.machineLocation();
    const leftOffset = 40 * this.scale.screenWidth;
    const left = locationMachine.left + leftOffset;
    const top = locationMachine.top - this.ledSize().height + 5;
    return {top, left};
  }

  tileBoardLocation () {
    const locationMachine = this.machineLocation();
    const leftOffset = 60 * this.scale.screenWidth;
    const left = locationMachine.left + leftOffset;
    const top = locationMachine.top + 140 * this.props.scale.screenHeight;
    return {top, left};
  }

  buttonSize () {
    const scaleButton= 1;
    return ({
      width: buttonSprite.size.width * scaleButton * this.scale.image,
      height: buttonSprite.size.width * scaleButton * this.scale.image,
    });
  }

  buttonLocation () {
    const locationMachine = this.machineLocation();
    const machineSize = this.machineSize();
    const leftOffset = 418 * this.scale.screenWidth;
    const topOffset = 135 * this.scale.screenHeight;
    const left = locationMachine.left + machineSize.width - leftOffset;
    const top = SCREEN_HEIGHT - machineSize.height + topOffset;
    return {top, left};
  }

  birdSize () {
    const scaleBird = 1.9;
    return {
      width: birdSprite.size.width * scaleBird * this.scale.image,
      height: birdSprite.size.height * scaleBird * this.scale.image,
    };
  }

  birdStartLocation () {
    const topOffset = 60 * this.scale.screenHeight;
    const birdHeight = this.birdSize().height;
    const top = SCREEN_HEIGHT - birdHeight - topOffset;
    const left = 20 * this.scale.screenWidth;
    return {top, left};
  }

  birdEndLocation () {
    const topOffset = 140 * this.scale.screenHeight;
    const birdHeight = this.birdSize().height;
    const top = SCREEN_HEIGHT - birdHeight - topOffset;
    const left = 40 * this.scale.screenWidth;
    return {top, left};
  }

  characterDisapointed () {
    if (!this.disgustPlaying) {
      this.disgustPlaying = true;
      this.disgustSound.play(() => {this.disgustPlaying = false;});
    }
    const frameIndex = _.concat(
      birdSprite.animationIndex('DISGUST'),
      birdSprite.animationIndex('DISGUST'),
      birdSprite.animationIndex('DISGUST')
    );
    this.ledsOn = []; this.numPresses = 0;
    this.setState({
      birdAnimationIndex: frameIndex,
      showFood: false,
      leds: gameTiles.ledController([], this.numLeds),
      leverAnimationIndex: leverSprite.animationIndex('SWITCH_OFF'),
    });
  }

  characterCelebrateAndEat () {
    this.refs.foodRef.tweenSprite();
    const celebratIndex = birdSprite.animationIndex('CELEBRATE');
    this.setState({
      birdAnimationIndex: celebratIndex,
      showFood: true,
    }, () => {
      this.celebrateTimeout = setTimeout(() => {
        if (!this.celebratePlaying) {
          this.celebratePlaying = true;
          this.celebrateSound.play(() => {this.celebratePlaying = false;});
        }
        this.nextTrial(this.state.trial + 1);
        this.ledsOn = []; this.numPresses = 0;
        this.setState({
          birdAnimationIndex: birdSprite.animationIndex('EAT'),
          leds: gameTiles.ledController([], this.numLeds),
          leverAnimationIndex: leverSprite.animationIndex('SWITCH_OFF'),
        });
      }, 1200 );
    });
  }

  playTilePressSound (tileIndex) {
    if (_.some([0, 1, 2], (val) => val === tileIndex)) {
      this.topToneSound.stop();
      this.topToneSound.setCurrentTime(0);
      this.topToneSound.play();
    }
    if (_.some([3, 4, 5], (val) => val === tileIndex)) {
      this.middleToneSound.stop();
      this.middleToneSound.setCurrentTime(0);
      this.middleToneSound.play();
    }
    if (_.some([6, 7, 8], (val) => val === tileIndex)) {
      this.bottomToneSound.stop();
      this.bottomToneSound.setCurrentTime(0);
      this.bottomToneSound.play();
    }
  }

  gameBoardTilePress (tile, index) {
    if (!this.activeGameboard) return;

    this.playTilePressSound(index);
    const tiles = _.cloneDeep(this.state.tiles);
    tiles[index].frameKey = 'PRESSED';
    tiles[index].uid = randomstring({ length: 7 });
    this.setState(
      { tiles },
      () => {
        this.btnTimeout = setTimeout(() => {
          const tiles = _.cloneDeep(this.state.tiles);
          tiles[index].frameKey = 'IDLE';
          tiles[index].uid = randomstring({ length: 7 });
          this.setState({ tiles });
        }, 80);
    });
    this.pressSequence.push(index);
    const pressSeq = _.cloneDeep(this.pressSequence);
    const blinkSeq = gameTiles.tileBlinkSequence(this.state.trial);
    if (this.reverseOrder) {
      // reverse mutates array
      _.reverse(blinkSeq);
    }
    const correct = _.every(pressSeq, (seqNum, index) => {
      return seqNum === blinkSeq[index];
    });
    if (correct) {
      if (this.reverseOrder) {
        const lengthSeq = this.numLeds - 1;
        this.ledsOn.push(lengthSeq - this.numPresses);
      } else {
        this.ledsOn.push(this.numPresses);
      }
      this.numPresses += 1;
      const ledsOn = _.cloneDeep(this.ledsOn);
      if (this.reverseOrder) {
        _.reverse(ledsOn);
      }
      this.setState({
        leds: gameTiles.ledController(ledsOn, this.numLeds),
      });
    }
    if (correct && (pressSeq.length === blinkSeq.length)) {
      // FLASH LIGHTS THEN ALL OFF
      this.waitForUserSeq = false;
      this.activeGameboard = false;
      this.characterCelebrateAndEat();
    } else if (!correct) {
      // HERE WE WOULD WANT TO BLINK ALL LIGHTS OFF
      this.waitForUserSeq = false;
      this.activeGameboard = false;
      this.characterDisapointed();
    }
    clearTimeout(this.timeoutGameOver);
    this.startInactivityMonitor();
  }

  onLoadScreenFinish () {
    this.setState({loadingScreen: false});
  }

  showLightbulb () {
    if (this.state.lightbulbDisplayed) return;

    const tweenOpts = gameUtil.getTweenOptions('lightbulb', 'on', this.props.scale.image,
        this.props.scale.screenHeight,
        this.props.scale.screenWidth, null);
    this.setState({
      lightbulbTweenOptions: tweenOpts,
      lightbulbImgIndex: 0,
      lightbulbDisplayed: true,
    }, () => {
      this.refs.lightbulbRef.startTween();
    });
    console.log("SHOW LIGHT BUBL. tweenOpts = ", tweenOpts);
  }

  render () {
    const fruitVisable = this.state.showFood ? true : false;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../media/backgrounds/Game_6_Background_1280.png')}
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
          }}>

            <AnimatedSprite
              visable={fruitVisable}
              sprite={foodSprite}
              ref={'foodRef'}
              spriteUID={this.characterUIDs.fruit}
              animationFrameIndex={foodSprite.animationIndex('IDLE')}
              tweenOptions = {this.foodSprite.tweenOptions}
              tweenStart={'fromMethod'}
              onTweenFinish={(characterUID) => this.onFoodTweenFinish(characterUID)}
              loopAnimation={false}
              coordinates={this.foodSprite.coords}
              size={this.foodSize()}
            />
            <AnimatedSprite
              ref={'birdRef'}
              sprite={birdSprite}
              spriteUID={this.characterUIDs.bird}
              animationFrameIndex={this.state.birdAnimationIndex}
              loopAnimation={false}
              coordinates={this.birdStartLocation()}
              size={this.birdSize()}
            />
            <AnimatedSprite
              sprite={beltSprite}
              spriteUID={this.characterUIDs.belt}
              animationFrameIndex={[0, 1]}
              loopAnimation={true}
              coordinates={this.conveyorBeltLocation()}
              size={this.conveyorBeltSize()}
            />

            <Matrix
              styles={{
                  ...(this.ledLocation()),
                  position: 'absolute',
                  width: 400 * this.props.scale.screenWidth,
                  height: 130 * this.props.scale.screenHeight,
                }}
              tileScale={1}
              tiles={this.state.leds}
              scale={this.props.scale}
            />

            <AnimatedSprite
              sprite={foodMachineSprite}
              spriteUID={this.characterUIDs.machine}
              animationFrameIndex={[0]}
              loopAnimation={false}
              coordinates={this.machineLocation()}
              size={this.machineSize()}
            />
            <AnimatedSprite
              sprite={arrowSprite}
              spriteUID={"happy_arrow:)"}
              animationFrameIndex={[this.state.arrowIndex]}
              loopAnimation={false}
              coordinates={this.directionArrowLocation()}
              size={{width: 110 * this.scale.image, height: 110 *  this.scale.image}}
            />

            <Matrix
              styles={{
                  ...(this.tileBoardLocation()),
                  position: 'absolute',
                  width: 400 * this.props.scale.image,
                  height: 400 * this.props.scale.image,
                }}
              tileScale={1}
              tiles={this.state.tiles}
              scale={this.props.scale}
              onPress={(tile, index) => this.gameBoardTilePress(tile, index)}
            />

            {this.state.blackout ?
              <View style={styles.blackout} />
            : null}

            <AnimatedSprite
              ref={'lightbulbRef'}
              sprite={lightbulbCharacter}
              spriteUID={'lightbulbRef'}
              coordinates={gameUtil.getCoordinates('lightbulb', this.props.scale.screenHeight,
                            this.props.scale.screenWidth, this.props.scale.image)}
              size={gameUtil.getSize('lightbulb', this.props.scale.image)}
              tweenOptions={this.state.lightbulbTweenOptions}
              tweenStart={'fromMethod'}
              animationFrameIndex={[this.state.lightbulbImgIndex]}
            />

            <AnimatedSprite
              sprite={leverSprite}
              spriteUID={this.characterUIDs.lever}
              animationFrameIndex={this.state.leverAnimationIndex}
              loopAnimation={false}
              coordinates={this.leverLocation()}
              size={this.leverSize()}
              rotate={[{rotateY:'0deg'}]}
              onPressIn={() => this.leverPressIn()}
              onPressOut={() => this.leverPressOut()}
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

          </Image>
          
        </View>
    );
  }
}

UnlockFoodGame.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  scale: React.PropTypes.object,
};

reactMixin.onClass(UnlockFoodGame, TimerMixin);

export default UnlockFoodGame;
