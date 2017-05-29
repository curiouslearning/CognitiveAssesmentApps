const greenFrogSprite = {
  name:"greenFrog",
  size: {width: 228, height: 150},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./frog_idle.png'),
    require('./frog_eat01.png'),
    require('./frog_eat02.png'),
    require('./frog_eat03.png'),
    require('./frog_disgust_01.png'),
  ],

  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'EAT':
        return [0,1,1,2,2,3,0];
      case 'DISGUST':
        return [0,4,4,4,4,4,0];
      case 'ALL':
        return [0,1,2,3,4,0];
    }
  },
};

export default greenFrogSprite;
