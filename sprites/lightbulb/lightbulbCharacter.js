"use strict";

const lightbulbCharacter = {
  name:"lightbulb",
  size: {width: 150, height: 300},
  animationTypes: ['ON', 'OFF', 'ALL'],
  frames:[
    require("./lightbulb_on.png"),
    require("./lightbulb_off.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ON':
        return [0];
      case 'OFF':
        return [1];
      case 'ALL':
        return [0, 1, 0];
    }
  },
};

export default lightbulbCharacter;
