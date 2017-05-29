import React from 'react';
import {
  View,
} from 'react-native';

import _ from 'lodash';
import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';
import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';
import foodSignsCharacter from '../../sprites/foodSigns/foodSignsCharacter';

class Signs extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {}
  componentDidMount () {}

  spriteSize (sprite, scale) {
    const scaleBy = scale * this.props.scale.image;
    return _.mapValues(sprite.size, (val) => val * scaleBy);
  }

  signStartLocation (position, scale) {
    const top = 0; // -350 * scale.screenHeight;
    const baseLeft = 0;
    switch (position) {
      case 0:
        return {top, left: baseLeft * scale.screenWidth};
      case 1:
        return {top, left: (baseLeft + 200) * scale.screenWidth};
      case 2:
        return {top, left: (baseLeft + 400) * scale.screenWidth};
      case 3:
        return {top, left: (baseLeft + 600) * scale.screenWidth};
    }
  }

  signOnPress (signInfo) {
    this.props.onPress(signInfo);
  }

  render () {
    return (
      <View>
        {this.props.symbolOrder[0] ?
          <AnimatedSprite
            sprite={foodSignsCharacter}
            ref={'sign1'}
            animationFrameIndex={foodSignsCharacter.animationIndex(this.props.symbolOrder[0])}
            coordinates={this.signStartLocation(0, this.props.scale)}
            size={this.spriteSize(foodSignsCharacter, 1)}
            draggable={false}
            onPress={() => this.signOnPress({signNumber: 0, symbol: this.props.symbolOrder[0]})}
          />
        : null}
        {this.props.symbolOrder[1] ?
          <AnimatedSprite
            sprite={foodSignsCharacter}
            ref={'sign2'}
            animationFrameIndex={foodSignsCharacter.animationIndex(this.props.symbolOrder[1])}
            coordinates={this.signStartLocation(1, this.props.scale)}
            size={this.spriteSize(foodSignsCharacter, 1)}
            draggable={false}
            onPress={() => this.signOnPress({signNumber: 1, symbol: this.props.symbolOrder[1]})}
          />
        : null}
        {this.props.symbolOrder[2] ?
          <AnimatedSprite
            sprite={foodSignsCharacter}
            ref={'sign3'}
            animationFrameIndex={foodSignsCharacter.animationIndex(this.props.symbolOrder[2])}
            coordinates={this.signStartLocation(2, this.props.scale)}
            size={this.spriteSize(foodSignsCharacter, 1)}
            draggable={false}
            onPress={() => this.signOnPress({signNumber: 2, symbol: this.props.symbolOrder[2]})}
          />
        : null}
        {this.props.symbolOrder[3] ?
          <AnimatedSprite
            sprite={foodSignsCharacter}
            ref={'sign4'}
            animationFrameIndex={foodSignsCharacter.animationIndex(this.props.symbolOrder[3])}
            coordinates={this.signStartLocation(3, this.props.scale)}
            size={this.spriteSize(foodSignsCharacter, 1)}
            draggable={false}
            onPress={() => this.signOnPress({signNumber: 3, symbol: this.props.symbolOrder[3]})}
          />
        : null}

      </View>
    );
  }

}

Signs.propTypes = {
  symbolOrder: React.PropTypes.array.isRequired,
  scale: React.PropTypes.object.isRequired,
  onPress: React.PropTypes.func,
};

reactMixin.onClass(Signs, TimerMixin);

export default Signs;
