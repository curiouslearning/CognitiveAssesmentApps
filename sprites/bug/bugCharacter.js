
const bugCharacter = {
  name:"bug",
  size: {width: 150, height: 150},
  animationTypes: ['GREEN','BLUE','RED','YELLOW', 'GREY', 'ALL'],
  frames: [
    // require("./prettybug_idle03.png"),
    require("./bug_grey.png"),
    require("./bug_green.png"),
    require("./bug_blue.png"),
    require("./bug_red.png"),
    require("./bug_yellow.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'ALL':
        return [0, 1, 2, 3, 4];
    }
  },
};

export default bugCharacter;
