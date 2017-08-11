import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default class Lesson extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  getLessons() {
    return fetch(`http://www.khanacademy.org/api/v1/topic/${item.node_slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data: responseJson.children})
        })
        .catch ((error) => {
            console.error(error)
        })
  }
}