'use strict';

const bugfoodCharacter = {
  name:"bugfood",
  size: {width: 192, height: 192},
  animationTypes: ['IDLE', 'ALL'],
  frames:[
    require("./bug_idle01.png"),
    require("./bug_blue.png"),
    require("./bug_green.png"),
    require("./bug_red.png"),
    require("./bug_yellow.png"),
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

export default bugfoodCharacter;
