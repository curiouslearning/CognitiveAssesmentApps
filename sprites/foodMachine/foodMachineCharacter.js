const foodMachineCharacter = {
  name: "foodMachine",
  size: {width: 493, height: 590},
  animationTypes: ['IDLE', 'ALL'],
  frames: [
    require ("./food_machine.png"),
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

export default foodMachineCharacter;
