"use strict";

const verticalLeverCharacter = {
  name:"verticalLever",
  size: {width: 158, height: 194},
  animationTypes: ['IDLE', 'ALL', 'SWITCH'],
  frames:[
    require("./lever_up.png"),
    require("./lever_down.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0, 1];
      case 'SWITCH_ON':
        return [1];
      case 'SWITCH_OFF':
        return [0];
    }
  },
};

export default verticalLeverCharacter;
