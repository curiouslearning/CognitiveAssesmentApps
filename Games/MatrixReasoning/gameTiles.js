import _ from 'lodash';
import randomstring from 'random-string';
import hookedCardSprite from '../../sprites/hookCard/hookCardCharacter';
import trials from './trials';

function createTilesArray (activeTiles, sprites, frameKeys) {
  return _.map(activeTiles, (active, index) => ({
    sprite: sprites[index],
    frameKey: frameKeys[index],
    uid: randomstring({ length: 7 }),
    active,
  }));
}

function correctSelection (trialNumber) {
  // check valid trialNumber
  const numTrials = trials.length;
  const trialIndex = (!trialNumber || numTrials <= trialNumber) ? 0 : trialNumber;
  return trials[trialIndex].correctSelection;
}

function selectionTilesForTrial (trialNumber) {
  const numTrials = trials.length;
  const trialIndex = (!trialNumber || numTrials <= trialNumber) ? 0 : trialNumber;
  const activeTiles = trials[trialIndex].selectionTiles.activeTiles;
  const frameKeys = trials[trialIndex].selectionTiles.frameKeys;

  const sprites = _.fill(Array(activeTiles.length), hookedCardSprite);
  return createTilesArray(activeTiles, sprites, frameKeys);
}

function gameBoardTilesForTrial (trialNumber) {
  const numTrials = trials.length;
  const trialIndex = (!trialNumber || numTrials <= trialNumber) ? 0 : trialNumber;
  // console.warn(`numTrials = ${numTrials}`);
  // console.warn(`trialIndex = ${trialIndex}`);
  const activeTiles = trials[trialIndex].gameboardTiles.activeTiles;
  const frameKeys = trials[trialIndex].gameboardTiles.frameKeys;

  const sprites = _.fill(Array(activeTiles.length), hookedCardSprite);
  return createTilesArray(activeTiles, sprites, frameKeys);
}

function gameBoardTilesWithSelectionResult (trialNumber, selectionFrame) {
  const tiles = gameBoardTilesForTrial(trialNumber);
  tiles.frameKeys = _.map(tiles, (tile) => {
    if (tile.frameKey === 'BLANK') {
        tile.frameKey = selectionFrame;
        tile.activeTiles = true;
    }
    return tile;
  });
  return tiles;
}


export default {
  gameBoardTilesForTrial,
  selectionTilesForTrial,
  correctSelection,
  gameBoardTilesWithSelectionResult,
};
