"use strict";

const hookCardCharacter = {
  name:"hookCard",
  size: {width: 124, height: 142},
  animationTypes: ['BLANK', 'TRIANGLE', 'DIMOND', 'SQUARE', 'CIRCLE', 'SC01' , 'SC02' , 'SC03' , 'SC04' , 'SC05' , 'SC06' , 'SC07' , 'SC08' , 'SC09' , 'SC10' , 'SC11' , 'SC12' , 'SC13' , 'SC14' , 'SC15' , 'SC16' , 'SC17' , 'SC18' , 'SC19' , 'SC20' , 'SC21' , 'SC22' , 'SC23' , 'SC24', 'SC25', 'SC26', 'SC27', 'SC28', 'SC29', 'SC30', 'DC01' , 'DC02' , 'DC03' , 'DC04' , 'DC05' , 'DC06' , 'DC07' , 'DC08' , 'DC09' , 'DC10' , 'DC11' , 'DC12' , 'DC13' , 'DC14' , 'DC15' , 'DC16' , 'DC17' , 'DC18' , 'DC19' , 'DC20' , 'DC21' , 'DC22' , 'DC23' , 'DC24' , 'DC25' , 'DC26' , 'DC27' , 'DC28' , 'DC29' , 'DC30' , 'DC31' , 'DC32' , 'DC33' , 'DC34' , 'DC35' , 'DC36' , 'DC37' , 'DC38' , 'DC39' , 'DC40' , 'DC41' , 'DC42' , 'DC43' , 'DC44' , 'DC45' , 'DC46' , 'DC47' , 'DC48' , 'DC49' , 'DC50' , 'DC51' , 'DC52' , 'DC53' , 'DC54' , 'DC55' , 'DC56' , 'DC57' , 'DC58' , 'DC59' , 'DC60' , 'QC1', 'QC2', 'QC3', 'QC4', 'QC5', 'QC6', 'QC7', 'QC8', 'QC9', 'QC10', 'QC11', 'QC12', 'QC13', 'QC14', 'QC15', 'QC16', 'QC17', 'QC18', 'QC19', 'QC20', 'QC21', 'QC22', 'QC23', 'QC24', 'QC25', 'QC26', 'QC27', 'QC28', 'QC29', 'QC30', 'QC31', 'QC32', 'QC33', 'QC34', 'QC35', 'QC36', 'QC37', 'QC38', 'QC39', 'QC40', 'QC41', 'QC42', 'QC43', 'QC44', 'QC45', 'QC46', 'QC47', 'QC48', 'QC49', 'QC50', 'QC51', 'QC52', 'QC53', 'QC54', 'QC55', 'QC56', 'QC57', 'QC58', 'QC59', 'QC60', 'QC61', 'QC62', 'QC63', 'QC64', 'QC65', 'QC66', 'QC67', 'QC68', 'QC69', 'QC70', 'QC71', 'QC72', 'QC73', 'QC74', 'QC75', 'QC76', 'QC77', 'QC78', 'QC79', 'QC80', 'QC81', 'QC82', 'ALL'],
  frames: [
    require("./hook_and_card_small.png"),
    require("./hook_triangle.png"),
    require("./hook_square.png"),
    require("./hook_dimond.png"),
    require("./hook_circle.png"),
    require("./singleCards/single_card01.png"),
    require("./singleCards/single_card02.png"),
    require("./singleCards/single_card03.png"),
    require("./singleCards/single_card04.png"),
    require("./singleCards/single_card05.png"),
    require("./singleCards/single_card06.png"),
    require("./singleCards/single_card07.png"),
    require("./singleCards/single_card08.png"),
    require("./singleCards/single_card09.png"),
    require("./singleCards/single_card10.png"),
    require("./singleCards/single_card11.png"),
    require("./singleCards/single_card12.png"),
    require("./singleCards/single_card13.png"),
    require("./singleCards/single_card14.png"),
    require("./singleCards/single_card15.png"),
    require("./singleCards/single_card16.png"),
    require("./singleCards/single_card17.png"),
    require("./singleCards/single_card18.png"),
    require("./singleCards/single_card19.png"),
    require("./singleCards/single_card20.png"),
    require("./singleCards/single_card21.png"),
    require("./singleCards/single_card22.png"),
    require("./singleCards/single_card23.png"),
    require("./singleCards/single_card24.png"),
    require("./singleCards/single_card25.png"),
    require("./singleCards/single_card26.png"),
    require("./singleCards/single_card27.png"),
    require("./singleCards/single_card28.png"),
    require("./singleCards/single_card29.png"),
    require("./singleCards/single_card30.png"),
    require("./doubleCards/double_card01.png"),
    require("./doubleCards/double_card02.png"),
    require("./doubleCards/double_card03.png"),
    require("./doubleCards/double_card04.png"),
    require("./doubleCards/double_card05.png"),
    require("./doubleCards/double_card06.png"),
    require("./doubleCards/double_card07.png"),
    require("./doubleCards/double_card08.png"),
    require("./doubleCards/double_card09.png"),
    require("./doubleCards/double_card10.png"),
    require("./doubleCards/double_card11.png"),
    require("./doubleCards/double_card12.png"),
    require("./doubleCards/double_card13.png"),
    require("./doubleCards/double_card14.png"),
    require("./doubleCards/double_card15.png"),
    require("./doubleCards/double_card16.png"),
    require("./doubleCards/double_card17.png"),
    require("./doubleCards/double_card18.png"),
    require("./doubleCards/double_card19.png"),
    require("./doubleCards/double_card20.png"),
    require("./doubleCards/double_card21.png"),
    require("./doubleCards/double_card22.png"),
    require("./doubleCards/double_card23.png"),
    require("./doubleCards/double_card24.png"),
    require("./doubleCards/double_card25.png"),
    require("./doubleCards/double_card26.png"),
    require("./doubleCards/double_card27.png"),
    require("./doubleCards/double_card28.png"),
    require("./doubleCards/double_card29.png"),
    require("./doubleCards/double_card30.png"),
    require("./doubleCards/double_card31.png"),
    require("./doubleCards/double_card32.png"),
    require("./doubleCards/double_card33.png"),
    require("./doubleCards/double_card34.png"),
    require("./doubleCards/double_card35.png"),
    require("./doubleCards/double_card36.png"),
    require("./doubleCards/double_card37.png"),
    require("./doubleCards/double_card38.png"),
    require("./doubleCards/double_card39.png"),
    require("./doubleCards/double_card40.png"),
    require("./doubleCards/double_card41.png"),
    require("./doubleCards/double_card42.png"),
    require("./doubleCards/double_card43.png"),
    require("./doubleCards/double_card44.png"),
    require("./doubleCards/double_card45.png"),
    require("./doubleCards/double_card46.png"),
    require("./doubleCards/double_card47.png"),
    require("./doubleCards/double_card48.png"),
    require("./doubleCards/double_card49.png"),
    require("./doubleCards/double_card50.png"),
    require("./doubleCards/double_card51.png"),
    require("./doubleCards/double_card52.png"),
    require("./doubleCards/double_card53.png"),
    require("./doubleCards/double_card54.png"),
    require("./doubleCards/double_card55.png"),
    require("./doubleCards/double_card56.png"),
    require("./doubleCards/double_card57.png"),
    require("./doubleCards/double_card58.png"),
    require("./doubleCards/double_card59.png"),
    require("./doubleCards/double_card60.png"),
    require("./quadCards/quad_card01.png"),
    require("./quadCards/quad_card02.png"),
    require("./quadCards/quad_card03.png"),
    require("./quadCards/quad_card04.png"),
    require("./quadCards/quad_card05.png"),
    require("./quadCards/quad_card06.png"),
    require("./quadCards/quad_card07.png"),
    require("./quadCards/quad_card08.png"),
    require("./quadCards/quad_card09.png"),
    require("./quadCards/quad_card10.png"),
    require("./quadCards/quad_card11.png"),
    require("./quadCards/quad_card12.png"),
    require("./quadCards/quad_card13.png"),
    require("./quadCards/quad_card14.png"),
    require("./quadCards/quad_card15.png"),
    require("./quadCards/quad_card16.png"),
    require("./quadCards/quad_card17.png"),
    require("./quadCards/quad_card18.png"),
    require("./quadCards/quad_card19.png"),
    require("./quadCards/quad_card20.png"),
    require("./quadCards/quad_card21.png"),
    require("./quadCards/quad_card22.png"),
    require("./quadCards/quad_card23.png"),
    require("./quadCards/quad_card24.png"),
    require("./quadCards/quad_card25.png"),
    require("./quadCards/quad_card26.png"),
    require("./quadCards/quad_card27.png"),
    require("./quadCards/quad_card28.png"),
    require("./quadCards/quad_card29.png"),
    require("./quadCards/quad_card30.png"),
    require("./quadCards/quad_card31.png"),
    require("./quadCards/quad_card32.png"),
    require("./quadCards/quad_card33.png"),
    require("./quadCards/quad_card34.png"),
    require("./quadCards/quad_card35.png"),
    require("./quadCards/quad_card36.png"),
    require("./quadCards/quad_card37.png"),
    require("./quadCards/quad_card38.png"),
    require("./quadCards/quad_card39.png"),
    require("./quadCards/quad_card40.png"),
    require("./quadCards/quad_card41.png"),
    require("./quadCards/quad_card42.png"),
    require("./quadCards/quad_card43.png"),
    require("./quadCards/quad_card44.png"),
    require("./quadCards/quad_card45.png"),
    require("./quadCards/quad_card46.png"),
    require("./quadCards/quad_card47.png"),
    require("./quadCards/quad_card48.png"),
    require("./quadCards/quad_card49.png"),
    require("./quadCards/quad_card50.png"),
    require("./quadCards/quad_card51.png"),
    require("./quadCards/quad_card52.png"),
    require("./quadCards/quad_card53.png"),
    require("./quadCards/quad_card54.png"),
    require("./quadCards/quad_card55.png"),
    require("./quadCards/quad_card56.png"),
    require("./quadCards/quad_card57.png"),
    require("./quadCards/quad_card58.png"),
    require("./quadCards/quad_card59.png"),
    require("./quadCards/quad_card60.png"),
    require("./quadCards/quad_card61.png"),
    require("./quadCards/quad_card62.png"),
    require("./quadCards/quad_card63.png"),
    require("./quadCards/quad_card64.png"),
    require("./quadCards/quad_card65.png"),
    require("./quadCards/quad_card66.png"),
    require("./quadCards/quad_card67.png"),
    require("./quadCards/quad_card68.png"),
    require("./quadCards/quad_card69.png"),
    require("./quadCards/quad_card70.png"),
    require("./quadCards/quad_card71.png"),
    require("./quadCards/quad_card72.png"),
    require("./quadCards/quad_card73.png"),
    require("./quadCards/quad_card74.png"),
    require("./quadCards/quad_card75.png"),
    require("./quadCards/quad_card76.png"),
    require("./quadCards/quad_card77.png"),
    require("./quadCards/quad_card78.png"),
    require("./quadCards/quad_card79.png"),
    require("./quadCards/quad_card80.png"),
    require("./quadCards/quad_card81.png"),
    require("./quadCards/quad_card82.png"),
  ],
  animationIndex: function getAnimationIndex (animationType) {
    switch (animationType) {
      case 'BLANK':
        return [0];
      case 'TRIANGLE':
        return [1];
      case 'DIMOND':
        return [3];
      case 'SQUARE':
        return [2];
      case 'CIRCLE':
        return [4];
      case 'SC01':
        return [5];
      case 'SC02':
        return [6];
      case 'SC03':
        return [7];
      case 'SC04':
        return [8];
      case 'SC05':
        return [9];
      case 'SC06':
        return [10];
      case 'SC07':
        return [11];
      case 'SC08':
        return [12];
      case 'SC09':
        return [13];
      case 'SC10':
        return [14];
      case 'SC11':
        return [15];
      case 'SC12':
        return [16];
      case 'SC13':
        return [17];
      case 'SC14':
        return [18];
      case 'SC15':
        return [19];
      case 'SC16':
        return [20];
      case 'SC17':
        return [21];
      case 'SC18':
        return [22];
      case 'SC19':
        return [23];
      case 'SC20':
        return [24];
      case 'SC21':
        return [25];
      case 'SC22':
        return [26];
      case 'SC23':
        return [27];
      case 'SC24':
        return [28];
      case 'SC25':
				return [29];
      case 'SC26':
				return [30];
      case 'SC27':
				return [31];
      case 'SC28':
				return [32];
      case 'SC29':
				return [33];
      case 'SC30':
				return [34];
      case 'DC01':
				return [35];
      case 'DC02':
				return [36];
      case 'DC03':
				return [37];
      case 'DC04':
				return [38];
      case 'DC05':
				return [39];
      case 'DC06':
				return [40];
      case 'DC07':
				return [41];
      case 'DC08':
				return [42];
      case 'DC09':
				return [43];
      case 'DC10':
				return [44];
      case 'DC11':
				return [45];
      case 'DC12':
				return [46];
      case 'DC13':
				return [47];
      case 'DC14':
				return [48];
      case 'DC15':
				return [49];
      case 'DC16':
				return [50];
      case 'DC17':
				return [51];
      case 'DC18':
				return [52];
      case 'DC19':
				return [53];
      case 'DC20':
				return [54];
      case 'DC21':
				return [55];
      case 'DC22':
				return [56];
      case 'DC23':
				return [57];
      case 'DC24':
				return [58];
      case 'DC25':
				return [59];
      case 'DC26':
				return [60];
      case 'DC27':
				return [61];
      case 'DC28':
				return [62];
      case 'DC29':
				return [63];
      case 'DC30':
				return [64];
      case 'DC31':
				return [65];
      case 'DC32':
				return [66];
      case 'DC33':
				return [67];
      case 'DC34':
				return [68];
      case 'DC35':
				return [69];
      case 'DC36':
				return [70];
      case 'DC37':
				return [71];
      case 'DC38':
				return [72];
      case 'DC39':
				return [73];
      case 'DC40':
				return [74];
      case 'DC41':
				return [75];
      case 'DC42':
				return [76];
      case 'DC43':
				return [77];
      case 'DC44':
				return [78];
      case 'DC45':
				return [79];
      case 'DC46':
				return [80];
      case 'DC47':
				return [81];
      case 'DC48':
				return [82];
      case 'DC49':
				return [83];
      case 'DC50':
				return [84];
      case 'DC51':
				return [85];
      case 'DC52':
				return [86];
      case 'DC53':
				return [87];
      case 'DC54':
				return [88];
      case 'DC55':
				return [89];
      case 'DC56':
				return [90];
      case 'DC57':
				return [91];
      case 'DC58':
				return [92];
      case 'DC59':
				return [93];
      case 'DC60':
				return [94];
      case 'QC01':
				return [95];
      case 'QC02':
				return [96];
      case 'QC03':
				return [97];
      case 'QC04':
				return [98];
      case 'QC05':
				return [99];
      case 'QC06':
				return [100];
      case 'QC07':
				return [101];
      case 'QC08':
				return [102];
      case 'QC09':
				return [103];
      case 'QC10':
				return [104];
      case 'QC11':
				return [105];
      case 'QC12':
				return [106];
      case 'QC13':
				return [107];
      case 'QC14':
				return [108];
      case 'QC15':
				return [109];
      case 'QC16':
				return [110];
      case 'QC17':
				return [111];
      case 'QC18':
				return [112];
      case 'QC19':
				return [113];
      case 'QC20':
				return [114];
      case 'QC21':
				return [115];
      case 'QC22':
				return [116];
      case 'QC23':
				return [117];
      case 'QC24':
				return [118];
      case 'QC25':
				return [119];
      case 'QC26':
				return [120];
      case 'QC27':
				return [121];
      case 'QC28':
				return [122];
      case 'QC29':
				return [123];
      case 'QC30':
				return [124];
      case 'QC31':
				return [125];
      case 'QC32':
				return [126];
      case 'QC33':
				return [127];
      case 'QC34':
				return [128];
      case 'QC35':
				return [129];
      case 'QC36':
				return [130];
      case 'QC37':
				return [131];
      case 'QC38':
				return [132];
      case 'QC39':
				return [133];
      case 'QC40':
				return [134];
      case 'QC41':
				return [135];
      case 'QC42':
				return [136];
      case 'QC43':
				return [137];
      case 'QC44':
				return [138];
      case 'QC45':
				return [139];
      case 'QC46':
				return [140];
      case 'QC47':
				return [141];
      case 'QC48':
				return [142];
      case 'QC49':
				return [143];
      case 'QC50':
				return [144];
      case 'QC51':
				return [145];
      case 'QC52':
				return [146];
      case 'QC53':
				return [147];
      case 'QC54':
				return [148];
      case 'QC55':
				return [149];
      case 'QC56':
				return [150];
      case 'QC57':
				return [151];
      case 'QC58':
				return [152];
      case 'QC59':
				return [153];
      case 'QC60':
				return [154];
      case 'QC61':
				return [155];
      case 'QC62':
				return [156];
      case 'QC63':
				return [157];
      case 'QC64':
				return [158];
      case 'QC65':
				return [159];
      case 'QC66':
				return [160];
      case 'QC67':
				return [161];
      case 'QC68':
				return [162];
      case 'QC69':
				return [163];
      case 'QC70':
				return [164];
      case 'QC71':
				return [165];
      case 'QC72':
				return [166];
      case 'QC73':
				return [167];
      case 'QC74':
				return [168];
      case 'QC75':
				return [169];
      case 'QC76':
				return [170];
      case 'QC77':
				return [171];
      case 'QC78':
				return [172];
      case 'QC79':
				return [173];
      case 'QC80':
				return [174];
      case 'QC81':
				return [175];
      case 'QC82':
				return [176];
      case 'ALL':
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176];
    }
  },
};

export default hookCardCharacter;
