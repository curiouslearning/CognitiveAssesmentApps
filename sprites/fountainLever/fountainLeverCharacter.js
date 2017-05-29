
const fountainLeverCharacter = {
  name:"fauntainLever",
  size: {width: 90, height: 158},
  animationTypes: ['IDLE', 'ALL'],
  frames:[
    require("./flever_up.png"),
    require("./flever_wiggle.png"),
    require("./flever_down.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0];
      case 'SWITCH_ON':
        return [2];
      case 'SWITCH_OFF':
        return [0];
      case 'WIGGLE':
        return [0, 1, 0, 1, 0];
    }
  },
};

export default fountainLeverCharacter;
