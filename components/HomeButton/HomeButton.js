import React from 'react';
import {
  TouchableOpacity,
  Image,
} from 'react-native';

// Expects styles
// {width: 150,
//   height: 150,
//   top:0, left: 0,
//   position: 'absolute',
// }

const HomeButton = function (props) {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={props.styles}
      onPress={() => props.navigator.replace(props.routeId)}>
      <Image
        source={require('../../media/icons/home_btn02.png')}
        style={{width: props.styles.width, height: props.styles.height}}
      />
    </TouchableOpacity>
  );
};

HomeButton.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  routeId: React.PropTypes.object.isRequired,
  styles: React.PropTypes.object.isRequired,
  scale: React.PropTypes.number,
};

// {width: 150,
//   height: 150,
//   top:0, left: 0,
//   position: 'absolute',
// }

export default HomeButton;
