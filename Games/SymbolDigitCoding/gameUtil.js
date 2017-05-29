import _ from 'lodash';
import randomstring from 'random-string';
import appleSprite from "../../sprites/apple/appleCharacter";
import grassSprite from "../../sprites/grass/grassCharacter";
import canSprite from "../../sprites/can/canCharacter";
import bugSprite from '../../sprites/bug/bugCharacter';
import shapeKeyCharacter from '../../sprites/shapeKey/shapeKeyCharacter';

import trials from './trials';

const SCALES = [0.4, 0.5, 0.8, 1, 1, 1, 1, 1, 1];

function createTilesArray (activeTiles, sprites, frameKeys) {
  return _.map(activeTiles, (active, index) => ({
    active,
    sprite: sprites[index],
    frameKey: frameKeys[index],
    uid: randomstring({ length: 7 }),
    scale: SCALES[index],
  }));
}


function thoughtTilesForTrial (trialNumber) {
  // assuming there is always one valid trial in trails.
  // use trails[0] for default.
  const trial = !trials[trialNumber] ? trials[0] : trials[trialNumber];

  const frameKeys = trial.thoughtTiles.frameKeys;
  const activeTiles = trial.thoughtTiles.activeTiles;
  const sprites = _.fill(Array(activeTiles.length), shapeKeyCharacter);
  return createTilesArray(activeTiles, sprites, frameKeys);
}

function symbols (trialNumber) {
  const trial = !trials[trialNumber] ? trials[0] : trials[trialNumber];
  return trial.displaySymbols.symbols;
}

function correctSymbol (trialNumber) {
  const trial = !trials[trialNumber] ? trials[0] : trials[trialNumber];
  return trial.correctSymbol;
}

function foodSprite (trial) {
  switch (correctSymbol(trial)) {
    case 'CAN':
      return canSprite;
    case 'FRUIT':
      return appleSprite;
    case 'BUG':
      return bugSprite;
    case 'GRASS':
      return grassSprite;
  }
}

export default {
  symbols,
  correctSymbol,
  foodSprite,
  thoughtTilesForTrial,
};
