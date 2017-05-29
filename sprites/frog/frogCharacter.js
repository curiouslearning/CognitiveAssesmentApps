const frogCharacter = {
  name:"greenFrog",
  size: {width: 228, height: 288},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./frog_idle.png'),
    require('./frog_hop01.png'),
    require('./frog_hop02.png'),
    require('./frog_eat01.png'),
    require('./frog_eat02.png'),
    require('./frog_eat03.png'),
    require('./frog_celebrate01.png'),
    require('./frog_celebrate02.png'),
    require('./frog_disgust_01.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [1,2,0];
      case 'EAT':
        return [0,3,3,4,4,5,0];
      case 'CELEBRATE':
        return [6,7,7,7,6,0];
      case 'DISGUST':
        return [0,8,8,8,8,8,0];
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8];
      case 'HOPON':
          return [0];
      case 'HOPOFF':
          return [2];
    }
  },
};

export default frogCharacter;
