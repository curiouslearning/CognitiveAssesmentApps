
const goatCharacter = {
  name:"goat",
  size: {width: 288, height: 240},
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('./goat_idle.png'),
    require('./goat_walk01.png'),
    require('./goat_walk02.png'),
    require('./goat_walk03.png'),
    require('./goat_eat01.png'),
    require('./goat_eat02.png'),
    require('./goat_celebrate01.png'),
    require('./goat_celebrate02.png'),
    require('./goat_disgust01.png'),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [1,2,3,0];
      case 'EAT':
        return [5,4,5,4,0];
      case 'CELEBRATE':
        return [6,7,6,0,6,7,6,0];
      case 'DISGUST':
        return [0,8,8,8,0];
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8];
    }
  },
};

export default goatCharacter;
