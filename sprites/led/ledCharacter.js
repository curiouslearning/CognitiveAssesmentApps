const ledCharacter = {
  name: "led",
  size: {width: 70, height: 120},
  animationTypes: ['ON', 'OFF', 'IDLE', 'ALL'],
  frames:[
    require ("./led_off.png"),
    require ("./led_on.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'OFF':
        return [0];
      case 'ON':
        return [1];
      case 'ALL':
        return [0, 1, 0];
    }
  },
};

export default ledCharacter;
