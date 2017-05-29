const dogCharacter = {
  name:"dog",
  size: {width: 168, height: 220},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./dog_idle.png'),
    require('./dog_walk00.png'),
    require('./dog_walk01.png'),
    require('./dog_eat01.png'),
    require('./dog_eat02.png'),
    require('./dog_eat03.png'),
    require('./dog_celebrate01.png'),
    require('./dog_celebrate02.png'),
    require('./dog_disgust01.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [1,2,1,0];
      case 'EAT':
        return [3,4,5,4,0];
      case 'CELEBRATE':
        return [7,6,7,0,7,6,7,0];
      case 'DISGUST':
        return [0,8,8,8,0];
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8];
    }
  },
};

export default dogCharacter;
