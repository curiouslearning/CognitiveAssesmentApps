const bubblesCharacter = {
  name:"bubble",
  size: {width: 200, height: 200},
  animationTypes: ['IDLE', 'ALL', 'CAN', 'FRUIT', 'FLY', 'GRASS'],
  frames:[
    require("./bubble_clockwise_large01.png"),
    require("./bubble_can01.png"),
    require("./bubble_fruit01.png"),
    require("./bubble_fly01.png"),
    require("./bubble_grass01.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'CAN':
        return [1];
      case 'FRUIT':
        return [2];
      case 'FLY':
        return [3];
      case 'GRASS':
        return [4];
      case 'ALL':
        return [0,1,2,3,4];
    }
  },
};

export default bubblesCharacter;
