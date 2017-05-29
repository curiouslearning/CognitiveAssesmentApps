'use strict';

const grassCharacter = {
  name:"grass",
  size: {width: 135, height: 135},
  animationTypes: ['IDLE', 'ALL'],
  frames:[
    require("./grass.png"),
    require("./grass_blue.png"),
    require("./grass_green.png"),
    require("./grass_red.png"),
    require("./grass_yellow.png"),
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

export default grassCharacter;
