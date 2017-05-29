"use strict";

const foodSignsCharacter = {
  name:"foodSign",
  // size: {width: 188, height: 300},
  size: {width: 188, height: 250},
  animationTypes: ['BUG', 'CAN', 'FRUIT', 'GRASS', 'BLANK', 'ALL'],
  frames: [
    require("./card_bug.png"),
    require("./card_can.png"),
    require("./card_fruit.png"),
    require("./card_grass.png"),
    require("./card_blank.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'BUG':
        return [0];
      case 'CAN':
        return [1];
      case 'FRUIT':
        return [2];
      case 'GRASS':
        return [3];
      case 'BLANK':
        return [4];
      case 'ALL':
        return [0, 1, 2, 3, 4];
    }
  },
};

export default foodSignsCharacter;
