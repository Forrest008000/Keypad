const ReactNative = require('react-native');
const React = require('react');
const Constants = require('./constants');
const TouchID = require('react-native-touch-id').default;

const {
  Component,
  PropTypes
} = React;

const {
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  View,
  AlertIOS,
  StatusBar
} = ReactNative;

const {
  constants
} = Constants;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161419'
  },
  promptText: {
    color: '#cf0000',
    fontSize: 25
  },
  keypadKeyButton: {
    flex : 1,
    color : '#161419',
    borderWidth : 1,
    borderColor: '#360000'
  }
});

let isAuthorized = false;

class Main extends Component {
  constructor(props) {
    super(props);
    this._touchIDHandler = this._touchIDHandler.bind(this);
    this._touchIDSupported = this._touchIDSupported.bind(this);
  }

  _touchIDSupported() {
    return(
      TouchID.authenticate('to demo this react-native component')
        .then(success => {
          AlertIOS.alert('Authenticated Successfully');
          isAuthorized = true;
        })
        .catch(error => {
          AlertIOS.alert('Authentication Failed');
        })
    );
  }

  _touchIDHandler() {
    console.log('Pressed');

    TouchID.isSupported()
    .then(this._touchIDSupported)
    .catch(function(error) {
      AlertIOS.alert('TouchID not supported');
    });

  }



  render() {
    const prompt = isAuthorized ? 'Unlocked' : 'Locked';
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <TouchableHighlight
          onPress={this._touchIDHandler}
        >
          <Text style={styles.promptText}>
            {prompt}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

};



module.exports = Main;