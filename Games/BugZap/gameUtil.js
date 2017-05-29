import greenFrogCharacter from '../../sprites/swimingGreenFrog/greenFrogSprite';
import blueFrogCharacter from '../../sprites/swimingBlueFrog/blueFrogSprite';

import trials from './trials';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

function getFrogSprite (color) {
  switch (color) {
    case 'green':
      return greenFrogCharacter;
    case 'blue':
      return blueFrogCharacter;
    default:
      console.error('Frog sprite does not exist.');
  }
}

function getCoordinates (characterName, scaleHeight, scaleWidth, scaleImage) {
  switch (characterName) {
    case 'lever':
      return {top: SCREEN_HEIGHT - 220 * scaleHeight,
              left: SCREEN_WIDTH/2 - 100 * scaleWidth};
    case 'signRight':
      return {top: -300 * scaleImage,
              left: SCREEN_WIDTH/2 + (210 * scaleWidth)};
    case 'signLeft':
      return {top: -300 * scaleImage,
              left: SCREEN_WIDTH/2 - (360 * scaleWidth)};
    case 'lightbulb':
      return {top: -300 * scaleImage,
              left: SCREEN_WIDTH/2 - (75 * scaleWidth)};
    case 'bugRight':
      return {top: 75 * scaleHeight,
              left: SCREEN_WIDTH/2 + (220 * scaleWidth)};
    case 'bugLeft':
      return {top: 75 * scaleHeight,
              left: SCREEN_WIDTH/2 - (350 * scaleWidth)};
  }
}

function getSize (characterName, scaleImage) {
  switch (characterName) {
    case 'lever':
      return {width: 158 * scaleImage, height: 194 * scaleImage};
    case 'splash':
      return {width: 340 * scaleImage, height: 200 * scaleImage};
    case 'sign':
      return {width: 140 * scaleImage, height: 230 * scaleImage};
    case 'lightbulb':
      return {width: 150 * scaleImage, height: 300 * scaleImage};
    case 'bug':
      return {width: 120 * scaleImage, height: 120 * scaleImage};
    case 'frog':
      return {width: 228 * 1.5 * scaleImage, height: 150 * 1.5 * scaleImage};
  }
}

function getTweenOptions (characterName, whichTween, scaleImage, scaleHeight, scaleWidth, startX) {
  let character = characterName;
  if (characterName === 'lightbulb') {
    character = 'sign';
  }
  switch (character) {
    case 'sign' :
      if (whichTween == 'on') {
        return {
          tweenType: "bounce-drop",
          startY: -300 * scaleImage,
          endY: -10 * scaleHeight,
          duration: 1500,
          repeatable: false,
          loop: false,
        };
      } else {
        return {
          tweenType: 'linear-move',
          startXY: [startX, -10 * scaleHeight],
          endXY: [startX, -300 * scaleImage],
          duration: 600,
          loop: false,
        };
      }
    case 'bug':
      if (whichTween == 'right') {
        return {
          tweenType: "curve-fall",
          startXY: [SCREEN_WIDTH/2 + (210 * scaleWidth), 95 * scaleHeight],
          endXY: [SCREEN_WIDTH/2 + (210 * scaleWidth) + 60, 460 * scaleHeight],
          duration: 1000,
          loop: false,
        };
    } else {
        return {
          tweenType: "curve-fall",
          startXY: [SCREEN_WIDTH/2 - (360 * scaleWidth), 95 * scaleHeight],
          endXY: [SCREEN_WIDTH/2 - (360 * scaleWidth) - 60, 460 * scaleHeight],
          duration: 1000,
          loop: false,
        };
    }
  }
}

function getBugTweenOptions (bugSide, frogSide, frogCoords, frogSize, scaleWidth, scaleHeight) {
  // funkyness since frog can be diag to bug
  const size = frogSide === 'right' ? {width: 20, height: frogSize.height*0.8} : {width: frogSize.width-20, height: frogSize.height*0.8};
  switch (bugSide) {
    case 'right':
      return {
        tweenType: "curve-fall",
        startXY: [SCREEN_WIDTH/2 + (210 * scaleWidth), 95 * scaleHeight],
        endXY: [frogCoords.left + size.width, frogCoords.top + size.height],
        duration: 1000,
        loop: false,
      };

    case 'left':
      return {
        tweenType: "curve-fall",
        startXY: [SCREEN_WIDTH/2 - (360 * scaleWidth), 95 * scaleHeight],
        endXY: [frogCoords.left + size.width-(65 * scaleWidth), frogCoords.top + size.height + 20 * scaleHeight],
        duration: 1000,
        loop: false,
      };
  }
}

function valuesForTrial (trialNumber = 0) {
  const numTrials = trials.length-1;
  const trialIndx = trialNumber > numTrials ? Math.floor(Math.random() * numTrials) : trialNumber;
  const trialData = trials[trialIndx];
  // Add sprite to trialData given frogColor value.
  switch (trialData.frogColor) {
    case 'green':
      trialData.sprite = greenFrogCharacter;
      return trialData;
    case 'blue':
      trialData.sprite = blueFrogCharacter;
      return trialData;
    default:
      console.error('Frog sprite does not exist.');
  }
}

export default {
  getCoordinates,
  getSize,
  getTweenOptions,
  getBugTweenOptions,
  getFrogSprite,
  valuesForTrial,
};
