const gameIcon = {
  name:"gameIcon",
  size: {width: 200, height: 200},
  animationTypes: [
    'GAME_1_UNLOCKED',
    'GAME_1_LOCKED',
    'GAME_2_UNLOCKED',
    'GAME_2_LOCKED',
    'GAME_3_UNLOCKED',
    'GAME_3_LOCKED',
    'GAME_4_UNLOCKED',
    'GAME_4_LOCKED',
    'GAME_5_UNLOCKED',
    'GAME_5_LOCKED',
    'GAME_6_UNLOCKED',
    'GAME_6_LOCKED',
    'GAME_7_UNLOCKED',
    'GAME_7_LOCKED',
    'ALL',
  ],
  frames: [
    require("./game1_icon_bw.png"),
    require("./game1_icon_color.png"),
    require("./game2_icon_bw.png"),
    require("./game2_icon_color.png"),
    require("./game3_icon_bw.png"),
    require("./game3_icon_color.png"),
    require("./game4_icon_bw.png"),
    require("./game4_icon_color.png"),
    require("./game5_icon_bw.png"),
    require("./game5_icon_color.png"),
    require("./game6_icon_bw.png"),
    require("./game6_icon_color.png"),
    require("./game7_icon_bw.png"),
    require("./game7_icon_color.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'GAME_1_LOCKED':
        return [0];
      case 'GAME_1_UNLOCKED':
        return [1];
      case 'GAME_2_LOCKED':
        return [2];
      case 'GAME_2_UNLOCKED':
        return [3];
      case 'GAME_3_LOCKED':
        return [4];
      case 'GAME_3_UNLOCKED':
        return [5];
      case 'GAME_4_LOCKED':
        return [6];
      case 'GAME_4_UNLOCKED':
        return [7];
      case 'GAME_5_LOCKED':
        return [8];
      case 'GAME_5_UNLOCKED':
        return [9];
      case 'GAME_6_LOCKED':
        return [10];
      case 'GAME_6_UNLOCKED':
        return [11];
      case 'GAME_7_LOCKED':
        return [12];
      case 'GAME_7_UNLOCKED':
        return [13];
      case 'ALL':
        return [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
    }
  },
};

export default gameIcon;
