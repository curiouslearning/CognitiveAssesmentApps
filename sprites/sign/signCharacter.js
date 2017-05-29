'use strict';

const signCharacter = {
  name:"sign",
  size: {width: 188, height: 300},
  animationTypes: ['IDLE', 'ALL'],
  frames: [
    require("./sign.png"),
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

export default signCharacter;
