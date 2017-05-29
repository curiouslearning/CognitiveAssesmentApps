"use strict";

const blueShapesCharacter = {
  name:"apple",
  size: {width: 124, height: 142},
  animationTypes: ['IDLE', 'ALL'],
  frames: [
    require("./blue_circle.png"),
    require("./blue_diamond.png"),
    require("./blue_square.png"),
    require("./blue_triangle.png"),
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

export default blueShapesCharacter;
