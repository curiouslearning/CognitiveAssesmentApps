"use strict";

const yellowShapesCharacter = {
  name:"yellowShapes",
  size: {width: 124, height: 142},
  animationTypes: ['CIRCLE', 'DIAMOND', 'SQUARE', 'TRIANGLE', 'ALL'],
  frames: [
    require("./yellow_circle.png"),
    require("./yellow_diamond.png"),
    require("./yellow_square.png"),
    require("./yellow_triangle.png"),
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

export default yellowShapesCharacter;
