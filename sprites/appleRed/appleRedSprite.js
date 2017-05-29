"use strict";

const appleRedSprite = {
  name:"appleRed",
  size: {width: 135, height: 146},
  animationTypes: ['IDLE', 'ALL'],
  frames: [
    require("./apple_red.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0];
    }
  },
};

export default appleRedSprite;
