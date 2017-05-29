const beeSprite = {
  name: "bee",
  size: {width: 140, height: 140},
  animationTypes: ['IDLE', 'ALL'],
  frames:[
    require ("./bee_idle.png"),
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

export default beeSprite;
