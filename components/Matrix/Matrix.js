import React from 'react';
import {
  View,
} from 'react-native';

import _ from 'lodash';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import randomstring from 'random-string';

import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';

// Tile = {
//   sprite: sprites[index],
//   frameKey: frameKeys[index],
//   active,
// }

class Matrix extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    if (props.size) {
      this.size = props.size;
    } else {
      this.size = {rows: 3, columns: 3};
    }

  }

  componentWillMount () {}
  componentDidMount () {}

  spriteSize (sprite, scale) {
    const scaleBy = scale * this.props.scale.image;
    return _.mapValues(sprite.size, (val) => val * scaleBy);
  }

  cardStartLocation (position, sprite, scale) {
    const columns = this.size.columns;
    const rows = this.size.rows;
    const baseTop = 0;
    const baseLeft = 0;
    const spriteSize = this.spriteSize(sprite, scale);
    const top = baseTop + Math.floor(position/rows) * spriteSize.height;
    const left = baseLeft + position%columns * spriteSize.width;
    return {top, left};
  }

  tilePress (tile, index) {
    if (!this.props.onPress) return;
    this.props.onPress(tile, index);
  }

  tilePressIn (tile, index) {
    if (!this.props.onPressIn) return;
    this.props.onPressIn(tile, index);
  }
  tilePressOut (tile, index) {
    if (!this.props.onPressOut) return;
    this.props.onPressOut(tile, index);
  }

  render () {
    const cards = _.map(this.props.tiles, (tile, index) => {
      if (!tile.active) return null;
      const uid = tile.uid ? tile.uid : randomstring({ length: 7 });
      const tileScale = tile.scale ? tile.scale : this.props.tileScale;
      return (
        <AnimatedSprite
          sprite={tile.sprite}
          ref={`card${index}`}
          key={uid}
          animationFrameIndex={tile.sprite.animationIndex(tile.frameKey)}
          loopAnimation={false}
          coordinates={this.cardStartLocation(index, tile.sprite, this.props.tileScale)}
          size={this.spriteSize(tile.sprite, tileScale)}
          draggable={false}
          onPress={() => this.tilePress(tile, index)}
          onPressIn={() => this.tilePressIn(tile, index)}
          onPressOut={() => this.tilePressOut(tile, index)}
        />
      );
    });
    return (
      <View style={this.props.styles}>
        {cards}
      </View>
    );
  }
}

Matrix.propTypes = {
  scale: React.PropTypes.object.isRequired,
  size: React.PropTypes.object,
  tiles: React.PropTypes.array,
  styles: React.PropTypes.object,
  tileScale: React.PropTypes.number,
  onPress: React.PropTypes.func,
  onPressIn: React.PropTypes.func,
  onPressOut: React.PropTypes.func,
};

reactMixin.onClass(Matrix, TimerMixin);

export default Matrix;
