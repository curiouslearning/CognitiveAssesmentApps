const blueFrogSprite = {
  name:"blueFrog",
  size: {width: 228, height: 150},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./blue_frog_idle.png'),
    require('./blue_frog_eat01.png'),
    require('./blue_frog_eat02.png'),
    require('./blue_frog_eat03.png'),
    require('./blue_frog_disgust01.png'),
  ],

  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'EAT':
        return [0,1,1,2,2,3,0];
      case 'CELEBRATE':
        return [6,7,7,7,6,0];
      case 'DISGUST':
        return [0,4,4,4,4,4,0];
      case 'ALL':
        return [0,1,2,3,4,0];
    }
  },
};

export default blueFrogSprite;
