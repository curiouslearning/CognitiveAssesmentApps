"use strict";

const canCharacter = {
  name:"can",
  size: {width: 135, height: 144},
  animationTypes: ['IDLE', 'ALL'],
  frames: [
    require("./can.png"),
    require("./can_blue.png"),
    require("./can_green.png"),
    require("./can_red.png"),
    require("./can_yellow.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'BLUE':
        return [1];
      case 'GREEN':
        return [2];
      case 'RED':
        return [3];
      case 'YELLOW':
        return [4];
      case 'ALL':
        return [0,1,2,3,4];
    }
  },
};

export default canCharacter;
