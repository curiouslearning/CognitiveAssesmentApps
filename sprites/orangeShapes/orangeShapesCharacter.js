"use strict";

const orangeShapesCharacter = {
  name:"orangeShapes",
  size: {width: 124, height: 142},
  animationTypes: ['CIRCLE', 'DIAMOND', 'SQUARE', 'TRIANGLE', 'ALL'],
  frames: [
    require("./orange_circle.png"),
    require("./orange_diamond.png"),
    require("./orange_square.png"),
    require("./orange_triangle.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'CIRCLE':
        return [0];
      case 'DIAMOND':
        return [1];
      case 'SQUARE':
        return [2];
      case 'TRIANGLE':
        return [3];
      case 'ALL':
        return [0, 1, 2, 3];
    }
  },
};

export default orangeShapesCharacter;
