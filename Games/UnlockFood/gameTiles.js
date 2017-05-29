import _ from 'lodash';
import randomstring from 'random-string';
import buttonSprite from "../../sprites/button/buttonCharacter";
import ledSprite from "../../sprites/led/ledCharacter";


import trials from './trials';

function createTilesArray (activeTiles, sprites, frameKeys) {
  return _.map(activeTiles, (active, index) => ({
    sprite: sprites[index],
    frameKey: frameKeys[index],
    uid: randomstring({ length: 7 }),
    active,
  }));
}

function tileBlinkSequence (trialNumber) {
  const trial = !trials[trialNumber] ? trials[0] : trials[trialNumber];
  const seq = _.cloneDeep(trial.tileBlinkSequence);
  return seq;
}

function gameBoardTilesForTrial (trialNumber) {
  const trial = !trials[trialNumber] ? trials[0] : trials[trialNumber];
  const frameKeys = trial.gameBoardTilesForTrial.frameKeys;
  const activeTiles = trial.gameBoardTilesForTrial.activeTiles;

  const sprites = _.fill(Array(activeTiles.length), buttonSprite);
  return createTilesArray(activeTiles, sprites, frameKeys);
}

//
function ledController (ledsOn, numLeds) {
  let ledTiles = _.fill(Array(9), false);
  _.forEach(_.fill(Array(numLeds)), (val, index) => {
    ledTiles[index] = true;
  });
  let frameKeys = _.fill(Array(9), "OFF");
  _.forEach(ledsOn, (onIndx) => {
    frameKeys[onIndx] = "ON";
  });

  const sprites = _.fill(Array(ledTiles.length), ledSprite);
  return createTilesArray(ledTiles, sprites, frameKeys);
}

export default {
  gameBoardTilesForTrial,
  tileBlinkSequence,
  ledController,
};
