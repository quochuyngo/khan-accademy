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

import Detail from './DetailScreen.js'
export default class Lesson extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      lessonVideos: []
    }
  }

  onNextScreen = (data) => {
        this.props.navigator.push({
            component: Detail,
            title: `${data.translated_title}`,
            passProps: {
                data: data
            }
        })
    }
  getLessons(item) {
    return fetch(`http://www.khanacademy.org/api/v1/topic/${item.node_slug}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson.children })
        this.state.data.map((lesson) => {
            this.getVideosLesson(lesson)
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  getVideosLesson(item) {
    return fetch(`http://www.khanacademy.org/api/v1/topic/${item.node_slug}/videos`)
      .then((response) => response.json())
      .then((responseJson) => {
          let {lessonVideos} = this.state
          lessonVideos = responseJson
          //lessonVideos.concat(responseJson)
          //console.log(responseJson)
          this.setState({lessonVideos: lessonVideos})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidMount() {
    this.getLessons(this.props.data)
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 64 }}>
        <FlatList
          data={this.state.lessonVideos}
          automaticallyAdjustContentInsets={false}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            this.renderVideoCell(item)
          }
        />
      </View>
    )
  }

  renderVideoCell(item) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onNextScreen(item)}}>
        <View style={styles.container}>
           <Image 
              style={styles.imageCell}
               defaultSource = {require("../../assets/images/cover1.jpg")}
                source = {{uri: item.download_urls.png}}
          />
          <View style={styles.container}>
            <Text style={styles.title} >{item.translated_title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderCell(item) {
    return (
      <TouchableOpacity activeOpacity={0.8} >
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.title} >{item.translated_title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 14,
    marginRight: 14
  },
  cover: {
    marginBottom: 0,
    height: 168,
    width: Dimensions.get("window").width
  },
  title: {
    flex:1,
    flexWrap: 'wrap',
    fontSize: 12,
    fontWeight: 'bold'
  },

  imageCell: {
    height: 50,
    width: 70,
    borderRadius: 4
  },

}