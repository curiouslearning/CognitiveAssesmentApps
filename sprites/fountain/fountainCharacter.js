
const fountainCharacter = {
  name:"fauntain",
  size: {width: 487, height: 266},
  animationTypes: ['IDLE', 'ALL'],
  frames:[
    require("./bubble_machine.png"),
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

export default fountainCharacter;
