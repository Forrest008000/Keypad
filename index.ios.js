'use strict';

const React = require('react-native');
const Main = require('./components/main');

const {
  AppRegistry
} = React;

AppRegistry.registerComponent('Keypad', function() {
  return Main;
});
