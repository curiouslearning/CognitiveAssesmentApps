const birdCharacter = {
  name: "bird",
  size: {width: 180, height: 164},
  animationTypes: ['IDLE', 'ALL', 'CELEBRATE', 'EAT', 'FLY', 'DISGUST', 'WALK'],
  frames:[
    require ("./bird_idle.png"),
    require ("./bird_celebrate01.png"),
    require ("./bird_celebrate02.png"),
    require ("./bird_disgust01.png"),
    require ("./bird_eat01.png"),
    require ("./bird_eat02.png"),
    require ("./bird_fly01.png"),
    require ("./bird_fly02.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'CELEBRATE':
        return [1, 2, 0, 1, 2, 0];
      case 'DISGUST':
        return [3, 3, 0];
      case 'EAT':
        return [4, 5, 4, 5, 0];
      case 'FLY':
        return [6, 7];
      case 'WALK':
        return [6, 7];
      case 'ALL':
        return [0, 1, 2, 3, 4, 5, 6, 7, 0];
    }
  },
};

export default birdCharacter;
