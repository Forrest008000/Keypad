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
  promptTextLocked: {
    color: '#cf0000',
    fontSize: 25
  },
  promptTextUnlocked: {
    color: '#228B22',
    fontSize: 25
  },
  keypadKeyButton: {
    flex : 1,
    color : '#161419',
    borderWidth : 1,
    borderColor: '#360000'
  }
});


class Main extends Component {
  constructor(props) {
    super(props);
    this._touchIDHandler = this._touchIDHandler.bind(this);
    this._touchIDSupported = this._touchIDSupported.bind(this);
    this._renderPrompt = this._renderPrompt.bind(this);

    this.state = {
      isAuthorized : false
    };
  }

  _touchIDSupported() {

    if(this.state.isAuthorized) {
      this.setState({isAuthorized : false});
      return;
    }

    return(
      TouchID.authenticate('Place finger on TouchID sensor')
        .then(success => {
          AlertIOS.alert('Authenticated Successfully');
          this.setState({isAuthorized : true});
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

  _renderPrompt() {
    const prompt = this.state.isAuthorized ? 'Unlocked' : 'Locked';
    
    if (this.state.isAuthorized) {
      return (
        <View>
          <Text style={styles.promptTextUnlocked}>
            {prompt}
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.promptTextLocked}>
            {prompt}
          </Text>
        </View>
      );
    }
  }



  render() {
    console.log('isAUTH', this.state.isAuthorized);
    const renderPrompt = this._renderPrompt();
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <TouchableHighlight
          onPress={this._touchIDHandler}
        >
          {renderPrompt}
        </TouchableHighlight>
      </View>
    );
  }

}



module.exports = Main;