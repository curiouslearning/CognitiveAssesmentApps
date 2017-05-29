const beltCharacter = {
  name: "belt",
  size: {width: 300, height: 90},
  animationTypes: ['RUN', 'IDLE', 'ALL'],
  frames:[
    require ("./belt_01.png"),
    require ("./belt_02.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'RUN':
        return [0, 1];
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0, 1];
    }
  },
};

export default beltCharacter;
