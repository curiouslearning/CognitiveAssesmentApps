const arrowCharacter = {
  name: "arrow",
  size: {width: 110, height: 110},
  animationTypes: ['LEFT', 'RIGHT', 'ALL'],
  frames:[
    require ("./directional_arrow_left.png"),
    require ("./directional_arrow_right.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'RIGHT':
        return [1];
      case 'LEFT':
        return [0];
      case 'ALL':
        return [0,1];
    }
  },
};

export default arrowCharacter;
