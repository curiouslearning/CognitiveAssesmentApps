
import React from 'react';
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  AppRegistry,
  TouchableHighlight,
  AsyncStorage, 
} from 'react-native';

const t = require('tcomb-form-native');

const baseHeight = 800;
const baseWidth = 1280;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Form = t.form.Form;
const Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  developMode: t.Boolean        // a boolean
});

class Prefs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        value: {name: 'Curious',
        surname: 'Learner',
        age: 5,
        developMode: false,
      },
    };
  }

  componentWillMount () {
    AsyncStorage.getItem('@User:pref', (err, result) => {
      console.log(`GETTING = ${JSON.stringify(result)}`);
      if (result) {
        const prefs = JSON.parse(result);
        this.setState({ value: prefs });
      }
    });
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  goToGame = (gameId) => {
    debugger;
    this.props.navigator.replace({id: gameId});
  }
  
  onPress () {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
      try {
        AsyncStorage.setItem('@User:pref', JSON.stringify(value));
      } catch (error) {
        // Error saving data
      }
    }
  }

  render () {
    return (
      <View style={{backgroundColor: '#ffffff', flex: 1}} >
        <View style={styles.container}>
          <Form
            ref="form"
            type={Person}
            value={this.state.value}
            options={{}}
          />
          <TouchableHighlight 
            style={styles.fbutton} 
            onPress={() => this.onPress()} 
            underlayColor='#99d9f4'
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.button} >
          <Button          
            onPress={() => this.goToGame('Main')}
            title="Game Launcher"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 120,
    height: 30,
    top: 20,
    left: 20,
  },
  fontStyle: {
    fontSize: 42,
  },
  container: {
    justifyContent: 'center',
    top: 60,
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  fbutton: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


Prefs.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object.isRequired,
  scale: React.PropTypes.object,
};

export default Prefs;
