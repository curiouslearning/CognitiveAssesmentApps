const shapeKeyCharacter = {
  name: "shapeKey",
  size: {width: 124, height: 142},
  animationTypes: ['CAN', 'GRASS', 'BUG', 'FRUIT', 'ALL'],
  frames:[
    require ("./blue_triangle.png"),
    require ("./green_circle.png"),
    require ("./orange_triangle.png"),
    require ("./yellow_square.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'CAN':
        return [0];
      case 'GRASS':
        return [1];
      case 'BUG':
        return [2];
      case 'FRUIT':
        return [3];
      case 'ALL':
        return [0, 1, 2, 3, 0];
    }
  },
};

export default shapeKeyCharacter;
