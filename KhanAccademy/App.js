import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Video from './app/Video.js'
export default class App extends React.Component {
  render() {
    return (
      <Video/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
