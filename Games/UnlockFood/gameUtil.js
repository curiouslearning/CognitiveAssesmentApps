"use strict";

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

function getCoordinates (characterName, scaleHeight, scaleWidth, scaleImage) {
  switch (characterName) {
    case 'lightbulb':
      const coords = {top: -300 * scaleImage,
              left: SCREEN_WIDTH/4 - (75 * scaleWidth)};
      console.log("GETTING COORDS: ", coords);
      return coords;
  }
}

function getSize (characterName, scaleImage) {
  switch (characterName) {
    case 'lightbulb':
      return {width: 150 * scaleImage, height: 300 * scaleImage};
  }
}

function getTweenOptions (characterName, whichTween, scaleImage, scaleHeight, scaleWidth, startX) {
  switch (characterName) {
    case 'lightbulb' :
      if (whichTween == 'on') {
        console.log("return bounce-drop");
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
  }
}

export default {
  getCoordinates,
  getSize,
  getTweenOptions,
};
