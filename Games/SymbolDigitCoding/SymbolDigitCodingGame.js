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
import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';
import HomeButton from '../../components/HomeButton/HomeButton';
import LoadScreen from '../../components/LoadScreen';
import monsterSprite from '../../sprites/monster/monsterCharacter';
import Matrix from '../../components/Matrix';

import symbolTable from '../../sprites/symbolTable/symbolTableCharacter';
import Signs from './Signs';
import gameUtil from './gameUtil';

const Sound = require('react-native-sound');
const GAME_TIME_OUT = 15000;
const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

class SymbolDigitCodingGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      trial: 0,
      symbolOrder: [],
      showFood: false,
      monsterAnimationIndex: [0],
      thoughtTiles: {},
      loadingScreen: true,
      devMode: false,
    };
    this.monsterScale = 1.5;
    this.tableScale = 1.3;
    this.food = {
      sprite : {},
      tweenOptions: {},
      coords: {},
      size: {},
    };

    this.popSound;
    this.popPlaying = false;
    this.celebrateSound;
    this.celebratePlaying = false;
    this.disgustSound;
    this.disgustSound = false;
  }

  componentWillMount () {
    const trial = 0;
    this.food.sprite = gameUtil.foodSprite(trial);
    this.food.coords = this.foodStartLocation(1);
    this.food.size = this.spriteSize(this.food.sprite, 1);
    this.setState({
      trial,
      tweenOptions: this.makeFoodTweenObject(),
      symbolOrder: gameUtil.symbols(trial),
      thoughtTiles: gameUtil.thoughtTilesForTrial(trial),
    });
    this.loadSpriteAssets();
    AsyncStorage.getItem('@User:pref', (err, result) => {
      console.log(`GETTING = ${JSON.stringify(result)}`);
      const prefs = JSON.parse(result);
      if (prefs) {
        this.setState({ devMode: prefs.developMode });
      }
      setTimeout(() => this.startInactivityMonitor(), 500);
    });
  }

  loadSpriteAssets () {
    this.state.monsterAnimationIndex
    const indicies = _.concat(
      monsterSprite.animationIndex('ALL'),
      monsterSprite.animationIndex('IDLE'),
    );
    this.setState({ monsterAnimationIndex: indicies });
  }

  componentDidMount () {
    this.initSounds();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount () {
    this.releaseSounds();
    clearTimeout(this.stateTimeout);
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

  monsterMouthLocation () {
    const size = this.spriteSize(monsterSprite, this.monsterScale);
    const loc = this.monsterStartLocation();
    const top = loc.top + size.height * 0.4;
    const left = loc.left + size.width * 0.5;
    return {
      top,
      left,
    };
  }

  makeFoodTweenObject () {
    const mouthLocation = this.monsterMouthLocation();
    return {
      tweenType: "linear-move",
      startXY: [this.food.coords.left, this.food.coords.top],
      endXY: [mouthLocation.left, mouthLocation.top],
      duration: 1000,
      loop: false,
    };
  }

  foodStartLocation (position) {
    const scaleWidth = this.props.scale.screenWidth;
    const top = 100 * this.props.scale.screenHeight;
    const baseLeft = 320;
    switch (position) {
      case 0:
        return {top, left: baseLeft * scaleWidth};
      case 1:
        return {top, left: (baseLeft + 200) * scaleWidth};
      case 2:
        return {top, left: (baseLeft + 400) * scaleWidth};
      case 3:
        return {top, left: (baseLeft + 600) * scaleWidth};
    }

    return {top, left: baseLeft * this.props.scale.screenWidth};
  }

  spriteSize (sprite, scale) {
    const scaleBy = scale * this.props.scale.image;
    return _.mapValues(sprite.size, (val) => val * scaleBy);
  }

  monsterStartLocation () {
    const height = this.spriteSize(monsterSprite, this.monsterScale).height;
    const left = 150 * this.props.scale.screenWidth;
    const top = SCREEN_HEIGHT - height - (50 * this.props.scale.screenHeight);
    return {top, left};
  }

  tableLocation () {
    const size = this.spriteSize(symbolTable, this.tableScale);
    const left = SCREEN_WIDTH - size.width - (40 * this.props.scale.screenWidth);
    const top = SCREEN_HEIGHT - size.height - (160 * this.props.scale.screenHeight);
    return {top, left};
  }

  foodFall (item) {
    this.food.coords = this.foodStartLocation(item);
    this.setState({
      showFood: true,
      tweenOptions: this.makeFoodTweenObject(),
      },
    () => {
      this.refs.food.tweenSprite();
      this.stateTimeout = setTimeout(() => {
        if (!this.celebratePlaying) {
          this.celebratePlaying = true;
          this.celebrateSound.play(() => {this.celebratePlaying = false;});
        }
        this.setState({ monsterAnimationIndex: monsterSprite.animationIndex('EAT') });
      }, 500);
    });
  }

  nextTrial () {
    const trial = this.state.trial + 1;
    const symbolOrder = gameUtil.symbols(trial);
    this.food.sprite = gameUtil.foodSprite(trial);
    this.setState({
      trial,
      symbolOrder: symbolOrder,
      thoughtTiles: gameUtil.thoughtTilesForTrial(trial),
    });
  }

  signPressed (signInfo) {
    if (!this.popPlaying) {
      this.popPlaying = true;
      this.popSound.play(() => {this.popPlaying = false;});
    }
    const correctSymbol = gameUtil.correctSymbol(this.state.trial);
    if (_.isEqual(correctSymbol, signInfo.symbol)) {
      const symbolOrder = gameUtil.symbols(this.state.trial);
      const showSymbols = _.map(symbolOrder, (symbol) => (
        _.isEqual(correctSymbol, symbol) ? 'BLANK' : symbol
      ));
      // start food fall, monster eat and celebrate
      this.setState({
        symbolOrder: showSymbols,
      }, () => {
        this.stateTimeout = setTimeout(() => {
          this.foodFall(signInfo.signNumber);
        }, 120 * this.props.scale.screenHeight);

      });
    } else {
      if (!this.disgustPlaying) {
        this.disgustPlaying = true;
        this.disgustSound.play(() => {this.disgustPlaying = false;});
      }
      this.setState({
        monsterAnimationIndex: monsterSprite.animationIndex('DISGUST'),
        resetTrial: true,
      }, () => {
        this.stateTimeout = setTimeout(() => {
          this.nextTrial();
        }, 500 * this.props.scale.screenHeight);
      });
    }
    clearTimeout(this.timeoutGameOver);
    this.startInactivityMonitor();
  }

  onFoodTweenFinish () {
    this.setState({
      showFood: false,
    }, () => {
      this.nextTrial();
    });
  }

  cloudStyle () {
    const width = 193 * 1.5 * this.props.scale.image;
    const height =  135 * 1.5 * this.props.scale.image;
    const top = this.monsterStartLocation().top - (height * 0.6);
    const left = this.monsterStartLocation().left - (width * 0.45);

    return {
      width,
      height,
      top,
      left,
      position: 'absolute',
    };
  }

  matrixStyle () {
    const cloudStyle = this.cloudStyle();
    return {
      width: 200,
      height: 100,
      top: cloudStyle.top + 30 * this.props.scale.screenHeight,
      left: cloudStyle.left + 40 * this.props.scale.screenWidth,
      position: 'absolute',
    };
  }

  onLoadScreenFinish () {
    this.setState({loadingScreen: false});
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../../media/backgrounds/Game_6_Background_1280.png')}
          style={{width: 1280 * this.props.scale.screenWidth,
          height: 800 * this.props.scale.screenHeight, flex: 1}}
        />
        <View style={{
            top: 0 * this.props.scale.screenHeight,
            left: 280 * this.props.scale.screenWidth,
            width: 780 * this.props.scale.image,
            height: 300 * this.props.scale.image,
            position: 'absolute',
          }}>

          <Signs
            symbolOrder={this.state.symbolOrder}
            scale={this.props.scale}
            onPress={(signInfo) => this.signPressed(signInfo)}
          />
        </View>

        {this.state.showFood ?
          <AnimatedSprite
            sprite={this.food.sprite}
            ref={'food'}
            animationFrameIndex={[0]}
            coordinates={this.food.coords}
            size={this.food.size}
            draggable={false}
            tweenOptions={this.state.tweenOptions}
            tweenStart={'fromMethod'}
            onTweenFinish={() => this.onFoodTweenFinish()}
          />
        : null}

        <Image source={require('../../sprites/thoughtBubble/thought_bubble.png')}
          style={this.cloudStyle()}
        />

        <Matrix
          styles={this.matrixStyle()}
          tileScale={0.25}
          tiles={this.state.thoughtTiles}
          scale={this.props.scale}
        />

        <AnimatedSprite
          sprite={monsterSprite}
          spriteUID={'sasdkfja'}
          animationFrameIndex={this.state.monsterAnimationIndex}
          loopAnimation={false}
          tweenOptions={{}}
          tweenStart={'fromMethod'}
          coordinates={this.monsterStartLocation()}
          size={this.spriteSize(monsterSprite, this.monsterScale)}
          rotate={[{rotateY:'180deg'}]}
        />

        <AnimatedSprite
          sprite={symbolTable}
          spriteUID={randomstring({ length: 7})}
          animationFrameIndex={[0]}
          loopAnimation={false}
          tweenOptions={{}}
          tweenStart={'fromMethod'}
          coordinates={this.tableLocation()}
          size={this.spriteSize(symbolTable, this.tableScale)}
          rotate={[{rotateY:'0deg'}]}
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

SymbolDigitCodingGame.propTypes = {
  route: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  scale: React.PropTypes.object.isRequired,
};

reactMixin.onClass(SymbolDigitCodingGame, TimerMixin);

export default SymbolDigitCodingGame;
