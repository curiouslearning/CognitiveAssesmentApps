"use strict";

const loadScreenSprite = {
  name:"loadScreenSprite",
  size: {width: 1280, height: 800},
  animationTypes: ['ALL'],
  frames:[
    require("../../media/backgrounds/back01.jpg"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'ALL':
        return [0];
    }
  },
};

export default loadScreenSprite;
