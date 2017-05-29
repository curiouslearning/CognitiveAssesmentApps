"use strict";

const leverCharacter = {
  name:"lever",
  size: {width: 160, height: 350},
  animationTypes: ['IDLE', 'ALL', 'SWITCH', 'SWITCH_ON', 'SWItCH_OFF', 'SWITCH_ON_LEFT', 'SWItCH_OFF_LEFT', 'WIGGLE_LEFT'],
  frames:[
    require("./lever_up.png"),
    require("./lever_wiggle.png"),
    require("./lever_down.png"),
    require("./lever_down_left.png"),
    require("./lever_up_left.png"),
    require("./lever_wiggle_left.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0, 1, 2, 3, 4, 5, 0];
      case 'SWITCH_ON':
        return [2];
      case 'SWITCH_OFF':
        return [0];
      case 'IDLE_LEFT':
        return [4];
      case 'SWITCH_ON_LEFT':
        return [4];
      case 'SWITCH_OFF_LEFT':
        return [3];
      case 'WIGGLE_LEFT':
        return [4, 5, 4, 5, 4];
      case 'WIGGLE':
        return [0, 1, 0, 1, 0];
    }
  },
};

export default leverCharacter;
