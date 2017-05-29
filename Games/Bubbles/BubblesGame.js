import React from 'react';
import {
  Image,
  AppState,
  AsyncStorage,
} from 'react-native';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import randomstring from 'random-string';

import AnimatedSprite from "../../components/AnimatedSprite/AnimatedSprite";
import HomeButton from '../../components/HomeButton/HomeButton';
import LoadScreen from '../../components/LoadScreen';

import bubbleCharacter from '../../sprites/bubbles/bubblesCharacter';
import monsterCharacter from '../../sprites/monster/monsterCharacter';
import leverCharacter from '../../sprites/fountainLever/fountainLeverCharacter';
import fountainCharacter from '../../sprites/fountain/fountainCharacter';

import canCharacter from '../../sprites/can/canCharacter';
import flySprite from '../../sprites/bug/bugCharacter';
import fruitSprite from '../../sprites/apple/appleCharacter';
import grassSprite from '../../sprites/grass/grassCharacter';

const Sound = require('react-native-sound');

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;
const TOP_OFFSET = 20;

const GAME_TIME_OUT = 115000;
const MAX_NUMBER_BUBBLES = 10;

class BubblesGame extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      spriteAnimationKey: 'all',
      spriteAnimationKeyIndex: 0,
      leverAnimationIndex: [0],
      bubbleArray: [],
      bubbleAnimationIndex: [0],
      monsterAnimationIndex: [0],
      loadContent: false,
      showFood: false,
      loadingScreen: true,
      showLaunchBtn: true,
    };
    this.scale = this.props.scale;
    this.spriteUIDs = {};
    this.setDefaultAnimationState;
    this.bubbleFountainInterval;
    this.targetBubble = {active: false, uid: '', name: '', stopTweenOnPress: true};
    this.food = {active: false, uid: '', name: ''};
    this.monster = {tweenOptions: {}};

    this.popSound;
    this.popPlaying = false;
    this.leverSound;
    this.leverPlaying = false;
    this.celebrateSound;
    this.celebratePlaying = false;
}

  componentWillMount () {
    this.spriteUIDs = {
      bubble: randomstring({ length: 7 }),
      monster: randomstring({ length: 7 }),
      lever: randomstring({ length: 7 }),
      fountain: randomstring({ length: 7 }),
    };
    AsyncStorage.getItem('@User:pref', (err, result) => {
      console.log(`GETTING = ${JSON.stringify(result)}`);
      const prefs = JSON.parse(result);
      this.setState({ showLaunchBtn: prefs.developMode });
    });
    this.setState({
      bubbleAnimationIndex: bubbleCharacter.animationIndex('ALL'),
      monsterAnimationIndex: monsterCharacter.animationIndex('ALL'),
      loadContent: true,
    });
    this.setDefaultAnimationState = setTimeout(() => {
      this.setState({
        bubbleAnimationIndex: [0],
        monsterAnimationIndex: [0],
        loadContent: false,
      }, ()=>{this.characterWalkOn();});
    }, 1500);
  }

  componentDidMount () {
    // start trial timeout
    this.timeoutGameOver = setTimeout(() => {
      this.props.navigator.replace({
        id: "Main",
      });
      // game over when 15 seconds go by without bubble being popped
    }, GAME_TIME_OUT);
    this.initSounds();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount () {
    this.releaseAudio();
    clearInterval(this.eatInterval);
    clearInterval(this.bubbleFountainInterval);
    clearTimeout(this.setDefaultAnimationState);
    clearTimeout(this.timeoutGameOver);
    clearTimeout(this.celebrateTimeout);
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
    this.leverSound = new Sound('lever_switch.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.warn('failed to load the sound', error);
        return;
      }
      this.leverSound.setSpeed(1);
      this.leverSound.setNumberOfLoops(0);
      this.leverSound.setVolume(1);
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
  }

  releaseAudio () {
    this.popSound.stop();
    this.popSound.release();
    this.leverSound.stop();
    this.leverSound.release();
    this.celebrateSound.stop();
    this.celebrateSound.release();
  }

  _handleAppStateChange = (appState) => {
    // release all sound objects
    if (appState === 'inactive' || appState === 'background') {
      this.releaseAudio();
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
  }

  makeMoveTween (startXY=[-300, 500], endXY=[600, 400], duration=1500) {
    return ({
      tweenType: "linear-move",
      startXY: [startXY[0], startXY[1]],
      endXY: [endXY[0], endXY[1]],
      duration:duration,
      loop: false,
    });
  }

  characterWalkOn () {
    const monstStartLoc = this.monsterStartLocation();
    const monstEndLoc = this.monsterEndLocation();
    const startXY = [monstStartLoc.left, monstStartLoc.top];
    const endXY = [monstEndLoc.left, monstEndLoc.top];
    this.monster.tweenOptions = this.makeMoveTween(startXY, endXY);
    this.monster.loopAnimation = true;
    this.setState({
      monsterAnimationIndex: monsterCharacter.animationIndex('WALK'),
      tweenCharacter: true,
    }, ()=> {this.refs.monsterRef.tweenSprite();});
  }

  onTweenFinish (spriteUID) {
    const remainingBubbles = this.state.bubbleArray.filter((item) => {
      if (item.props.spriteUID === spriteUID) {
        return false;
      }
      return true;
    });
    this.setState({bubbleArray: remainingBubbles});
  }

  onCharacterTweenFinish () {
    this.monster.loopAnimation = false;
    this.setState({monsterAnimationIndex: monsterCharacter.animationIndex('IDLE')});
  }

  // random time for background bubbles to be on screen, between 2 and 6 seconds
  getRandomDuration () {
    return (Math.floor(Math.random() *  (4000)) + 2000);
  }

  // populate array of background bubbles
  createBubbles () {
    const uid = randomstring({ length: 7 });
    const displayTargetBubble = Math.random() < 0.5;
    let createTargetBubble = displayTargetBubble && !this.state.targetBubbleActive;

    let bubbles = [];
    let bubbleSize = {};
    let locSequence = [];
    let bubbleDeminsions;
    if (createTargetBubble) {
      bubbleDeminsions = 200;
    } else {
      bubbleDeminsions = Math.floor(Math.random()* 100) + 50;
    }
    bubbleSize = {
      width: Math.floor(bubbleDeminsions * this.scale.image),
      height: Math.floor(bubbleDeminsions * this.scale.image),
    };
    const fountainSize = this.foutainSize();
    const fountainLoc = this.fountainLocation();
    const fountainCenter = (fountainLoc.left + fountainSize.width/2);
    const offsetLeft = 80 * this.scale.screenWidth;
    const startLeft = fountainCenter - (bubbleSize.width/2 - offsetLeft);
    const startTop = fountainLoc.top - (bubbleSize.width * 0.7);

    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    const minusOrPlus = plusOrMinus > 0 ? -1 : 1;
    locSequence = [
      startLeft + plusOrMinus * Math.random() * (SCREEN_WIDTH/8),
      startLeft + minusOrPlus * Math.random() * (SCREEN_WIDTH/6),
      startLeft + plusOrMinus * Math.random() * (SCREEN_WIDTH/4),
      startLeft + minusOrPlus * Math.random() * (SCREEN_WIDTH/3),
    ];
    if (createTargetBubble) {
      locSequence = [startLeft];
    }

    let backgroundBubbleTween = {
      tweenType: "sine-wave",
      startXY: [startLeft, startTop],
      xTo: locSequence,
      yTo: [-bubbleDeminsions],
      duration: createTargetBubble
        ? 4000 : this.getRandomDuration(),
      loop: false,
    };

    if (createTargetBubble) {
      const target = Math.floor(Math.random() * 4);
      switch (target) {
        case 0:
          this.targetBubble.frameIndex = bubbleCharacter.animationIndex('CAN');
          this.targetBubble.name = 'can';
          break;
        case 1:
          this.targetBubble.frameIndex = bubbleCharacter.animationIndex('FRUIT');
          this.targetBubble.name = 'fruit';
          break;
        case 2:
          this.targetBubble.frameIndex = bubbleCharacter.animationIndex('FLY');
          this.targetBubble.name = 'fly';
          break;
        case 3:
          this.targetBubble.frameIndex = bubbleCharacter.animationIndex('GRASS');
          this.targetBubble.name = 'grass';
          break;
      }
      this.targetBubble.visable = true;
      this.targetBubble.uid = uid;
      this.targetBubble.tweenOptions = backgroundBubbleTween;
      this.targetBubble.coordinates = {
        top: startTop * this.scale.screenHeight,
        left: startLeft * this.scale.screenWidth,
      };
      this.targetBubble.size = bubbleSize;
      this.setState({targetBubbleActive: true});
    } else if (bubbles.length < MAX_NUMBER_BUBBLES) {
      bubbles.push(
        <AnimatedSprite
          sprite={bubbleCharacter}
          key={randomstring({ length: 7 })}
          spriteUID={uid}
          animationFrameIndex={[0]}
          tweenOptions={backgroundBubbleTween}
          tweenStart={'fromMount'}
          onTweenFinish={(spriteUID) => this.onTweenFinish(spriteUID)}
          loopAnimation={false}
          coordinates={{
            top: startTop * this.scale.screenHeight,
            left: startLeft * this.scale.screenWidth}}
          size={bubbleSize}
        />
      );

      if (this.state.bubbleArray.length <= MAX_NUMBER_BUBBLES) {
        this.setState({bubbleArray: this.state.bubbleArray.concat(bubbles)});
      }
    }
  }

  monsterMouthLocation () {
    const monstLoc = this.monsterEndLocation();
    const monstSize = this.monsterSize();
    const x = monstLoc.left + monstSize.width/2;
    const y = monstLoc.top + monstSize.height/2;
    return [x, y];
  }

  foodSize (food, dimension) {
    // scale to 120 x 120 or closest.
    const widthScale = 120/food.character.size.width;
    const heightScale = 120/food.character.size.height;
    const scale = widthScale > heightScale ? heightScale : widthScale;
    switch (dimension) {
      case 'width':
        return Math.floor((food.character.size.width * scale) * this.scale.image);
      case 'height':
        return Math.floor((food.character.size.height * scale) * this.scale.image);
    }
  }

  getFoodSprite (name, startX, startY) {
    const food = {};
    const mouthLoc = this.monsterMouthLocation();
    food.tweenOptions = {
      tweenType: 'sine-wave',
      startXY: [startX, startY],
      xTo: [mouthLoc[0]],
      yTo: [mouthLoc[1]],
      duration: 1000,
      loop: false,
    };
    food.active = true;
    food.uid = randomstring({length: 7});
    food.location = {top: startY * this.scale.screenHeight,
      left:startX * this.scale.screenWidth};
    switch (name) {
      case 'can':
        food.name = 'can';
        food.character = canCharacter;
        food.index = [0];
        food.size = {
          width: this.foodSize(food, 'width'),
          height: this.foodSize(food, 'height')};
        return food;
      case 'fly':
        food.name = 'fly';
        food.character = flySprite;
        food.index = [4];
        food.size = {
          width: this.foodSize(food, 'width'),
          height: this.foodSize(food, 'height')};
        return food;
      case 'fruit':
        food.name = 'fruit';
        food.character = fruitSprite;
        food.index = [0];
        food.size = {
          width: this.foodSize(food, 'width'),
          height: this.foodSize(food, 'height')};
        return food;
      case 'grass':
        food.name = 'grass';
        food.character = grassSprite;
        food.index = [0];
        food.size = {
          width: this.foodSize(food, 'width'),
          height: this.foodSize(food, 'height')};
        return food;
    }
  }

  foodFall (startX, startY) {
    this.food = this.getFoodSprite(this.targetBubble.name, startX, startY);
    this.setState({showFood: true});

    clearInterval (this.eatInterval);
    this.eatInterval = setInterval(() => {
      this.setState({
        monsterAnimationIndex: monsterCharacter.animationIndex('EAT'),
      }, () => {
        this.celebrateTimeout = setTimeout(() => {
          if (!this.celebratePlaying) {
            this.celebratePlaying = true;
            this.celebrateSound.play(() => {this.celebratePlaying = false;});
          }
          this.setState({
            monsterAnimationIndex: monsterCharacter.animationIndex('CELEBRATE'),
          });
        }, 600);
      });
      clearInterval(this.eatInterval);
    }, 600);
  }

  onFoodTweenFinish () {
    this.setState({
      showFood: false,
    });
  }

  popBubble (stopValues) {
    // NOTE: b/c of bug and use of opacity it is possible to pop the
    // transparent bubbble, since this should not happen we check if
    // targetBubble.visable == 0 and ignore.
    if (!this.targetBubble.visable) {
      return;
    }
    const stopValueX = stopValues[0];
    const stopValueY = stopValues[1];
    // TODO: opacity part of hack to what may be a
    // RN bug associated with premiture stopping of Tween and removing
    // The related component
    this.targetBubble.visable = false;
    this.setState({targetBubbleActive: true});
    if (!this.popPlaying) {
      this.popPlaying = true;
      this.popSound.play(() => {this.popPlaying = false;});
    }
    this.foodFall(stopValueX, stopValueY);
  }

  targetBubbleTweenFinish () {
    this.targetBubble.visable = true;
    this.setState({targetBubbleActive: false});
  }

  leverPressIn () {
    if (!this.leverPlaying) {
      this.leverPlaying = true;
      this.leverSound.play(() => {this.leverPlaying = false;});
    }
    this.setState({
      leverAnimationIndex: leverCharacter.animationIndex('SWITCH_ON'),
    });
    this.bubbleFountainInterval = setInterval(() => {
      this.createBubbles();
    }, 200);
  }

  leverPress () {
    // console.warn('lever PRESS');
  }

  leverPressOut () {
    this.setState({
      leverAnimationIndex: leverCharacter.animationIndex('SWITCH_OFF'),
    });
    clearInterval(this.bubbleFountainInterval);
  }
  foutainSize () {
    return ({
      width: fountainCharacter.size.width * this.scale.image,
      height: fountainCharacter.size.height * this.scale.image,
    });
  }
  fountainLocation () {
    //placement for fountain and lever
    const size = this.foutainSize();
    const left = ((SCREEN_WIDTH - size.width)/2);
    const top = (SCREEN_HEIGHT - size.height) - TOP_OFFSET;
    return ({top, left});
  }
  leverSize () {
    const scaleLever = 1.5;
    return ({
      width: leverCharacter.size.width * scaleLever * this.scale.image,
      height: leverCharacter.size.height * scaleLever * this.scale.image,
    });
  }
  leverLocation () {
    const locatoinFoutain = this.fountainLocation();
    const foutainSize = this.foutainSize();
    const left = locatoinFoutain.left + foutainSize.width - (15 * this.scale.screenWidth);
    const top = SCREEN_HEIGHT - foutainSize.height * 1.1;

    return {top, left};
  }

  monsterSize () {
    return {
      width: monsterCharacter.size.width * this.scale.image,
      height: monsterCharacter.size.height * this.scale.image,
    };
  }

  monsterStartLocation () {
    const characterOffset = 140 * this.scale.screenHeight;
    const characterHeight = monsterCharacter.size.height * this.scale.image;
    const top = (SCREEN_HEIGHT - characterHeight - characterOffset);
    const left = -300 * this.scale.screenWidth;
    return {top, left};
  }

  monsterEndLocation () {
    const characterOffset = 140 * this.scale.screenHeight;
    const characterHeight = monsterCharacter.size.height * this.scale.image;
    const top = (SCREEN_HEIGHT - characterHeight - characterOffset);
    const left = 40 * this.scale.screenWidth;
    return {top, left};
  }

  onLoadScreenFinish () {
    this.setState({loadingScreen: false});
  }

  render () {
    return (
      <Image
        source={require('../../media/backgrounds/Game_6_Background_1280.png')}
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
      }}>
          <AnimatedSprite
            sprite={leverCharacter}
            spriteUID={this.spriteUIDs.lever}
            animationFrameIndex={this.state.leverAnimationIndex}
            loopAnimation={false}
            coordinates={this.leverLocation()}
            size={this.leverSize()}
            rotate={[{rotateY:'0deg'}]}
            onPress={() => this.leverPress()}
            onPressIn={() => this.leverPressIn()}
            onPressOut={() => this.leverPressOut()}
          />

          {this.state.loadContent ?
            <AnimatedSprite
              sprite={bubbleCharacter}
              spriteUID={randomstring({length: 7})}
              animationFrameIndex={this.state.bubbleAnimationIndex}
              loopAnimation={false}
              coordinates={{top: 400 * this.scale.screenHeight,
                left: -300 * this.scale.screenWidth}}
              size={{ width: Math.floor(300 * this.scale.image),
                height: Math.floor(285 * this.scale.image)}}
            />
          : null}

          {this.state.bubbleArray}

          {this.state.targetBubbleActive ?
            <AnimatedSprite
              visable={this.targetBubble.visable}
              sprite={bubbleCharacter}
              spriteUID={this.targetBubble.uid}
              animationFrameIndex={this.targetBubble.frameIndex}
              loopAnimation={false}
              tweenOptions={this.targetBubble.tweenOptions}
              tweenStart={'fromMount'}
              onTweenFinish={(spriteUID) => this.targetBubbleTweenFinish(spriteUID)}
              coordinates={this.targetBubble.coordinates}
              size={this.targetBubble.size}
              stopAutoTweenOnPressIn={this.targetBubble.stopTweenOnPress}
              onTweenStopped={(stopValues) => this.popBubble(stopValues)}
            />
          : null}

          {this.state.showFood ?
            <AnimatedSprite
              sprite={this.food.character}
              spriteUID={this.food.uid}
              key={this.food.uid}
              animationFrameIndex={this.food.index}
              tweenOptions={this.food.tweenOptions}
              tweenStart={'fromMount'}
              onTweenFinish={(spriteUID) => this.onFoodTweenFinish(spriteUID)}
              loopAnimation={false}
              coordinates={this.food.location}
              size={this.food.size}
            />
          : null}

          <AnimatedSprite
            ref={'monsterRef'}
            sprite={monsterCharacter}
            spriteUID={this.spriteUIDs.monster}
            animationFrameIndex={this.state.monsterAnimationIndex}
            tweenStart={'fromMethod'}
            tweenOptions={this.monster.tweenOptions}
            onTweenFinish={(spriteUID)=> this.onCharacterTweenFinish(spriteUID)}
            loopAnimation={this.monster.loopAnimation}
            coordinates={this.monsterStartLocation()}
            size={{ width: Math.floor(300 * this.scale.image),
              height: Math.floor(285 * this.scale.screenHeight)}}
            rotate={[{rotateY:'180deg'}]}
          />

          <AnimatedSprite
            sprite={fountainCharacter}
            spriteUID={this.spriteUIDs.fountain}
            animationFrameIndex={[0]}
            loopAnimation={false}
            coordinates={this.fountainLocation()}
            size={{ width: fountainCharacter.size.width * this.scale.image,
              height: fountainCharacter.size.height * this.scale.image}}
          />
        {this.state.showLaunchBtn ?
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
    );
  }
}

BubblesGame.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  scale: React.PropTypes.object,
};

reactMixin.onClass(BubblesGame, TimerMixin);

export default BubblesGame;
