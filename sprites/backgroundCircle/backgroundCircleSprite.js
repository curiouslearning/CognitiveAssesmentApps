const backgroundCircleSprite = {
  name: "circle",
  size: {width: 200, height: 200},
  animationTypes: ['LEFT', 'RIGHT', 'ALL'],
  frames:[
    require ("./leftSide.png"),
    require ("./rightSide.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'LEFT':
       return [0];
      case 'RIGHT':
        return [1];
      case 'ALL':
        return [0, 1];
    }
  },
};

export default backgroundCircleSprite;
