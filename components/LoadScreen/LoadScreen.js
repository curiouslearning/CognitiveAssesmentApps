import React from 'react';
import {
} from 'react-native';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

import AnimatedSprite from '../../components/AnimatedSprite/AnimatedSprite';
import loadScreenSprite from '../../sprites/loadScreen/loadScreenSprite';


class LoadScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentWillMount () {}
  componentDidMount () {}

  onLoadScreenFinish () {
    this.props.onTweenFinish();
  }

  render () {
    return (
      <AnimatedSprite
        sprite={loadScreenSprite}
        spriteUID={'loadscreen'}
        animationFrameIndex={[0]}
        loopAnimation={false}
        tweenOptions={{
          tweenType: "zoom-out-existence",
          startScale: 1,
          startOpacity: 2,
          endScale: 2.2,
          duration: 2500,
          loop: false,
        }}
        tweenStart={'fromMount'}
        coordinates={{top: 0, left: 0}}
        onTweenFinish={() => this.onLoadScreenFinish()}
        size={{
          width: this.props.width,
          height: this.props.height,
        }}
      />
    );
  }
}

LoadScreen.propTypes = {
  onTweenFinish: React.PropTypes.func,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

reactMixin.onClass(LoadScreen, TimerMixin);

export default LoadScreen;
