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

import Lesson from './LessonScreen'
export default class Subject extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
        this.onNextScreen = this.onNextScreen.bind(this)
    }

    onNextScreen = (data) => {
        this.props.navigator.push({
            component: Lesson,
            title: `${data.translated_title}`,
            passProps: {
                data: data
            }
        })
    }

    titleStyle = (topic_slug) => {
        return {
            flexWrap: 'wrap', 
            fontSize: 12, 
            color: subjectColor[topic_slug],
            fontWeight: '500'
        }
    }

    coverViewStyle = (topic_slug) => {
        return {
            marginTop: 64,
            backgroundColor: subjectColor[topic_slug],
            marginBottom: 0,
            height: 168,
            width: Dimensions.get("window").width,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }

    coverImageStyle = (topic_slug) => {
        if (topic_slug == 'humanities') {
            return {
                 height: 168,
                 width: Dimensions.get("window").width
            }
        } else {
            return {
                height: 160,
                width: 160,
            }
        }
    }

    

    getSubjects(item) {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${item.node_slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson)
            this.setState({data: responseJson.children})
        })
        .catch ((error) => {
            console.error(error)
        })
    }
    componentDidMount() {
        this.getSubjects(this.props.data)
    }
    render() {
        let topic = this.props.topic
        return (
            <View style = {{flex:1}}>
                <View style = {this.coverViewStyle(topic)}>
                    <Image style = {this.coverImageStyle(topic)}
                    source = {{uri: this.props.data.icon}}
                    resizeMode = 'stretch'//'stretch'
                />
                </View>

                <View style = {{flex:1}} >
                    <FlatList
                        automaticallyAdjustContentInsets = {false} 
                        data = {this.state.data}
                        keyExtractor={(x, i) => i}
                        renderItem = {({item}) => 
                                this.renderCell(item)
                            }
                    />
                </View>
            </View>
        )
    }

    renderCell(item) {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => {this.onNextScreen(item)}}>
            <View style = {styles.container}> 
                <Image style = {{height: 34, width: 34, borderRadius: 17}}
                    source = {{uri: item.icon}}
                />
                <View style = {styles.container}>
                    <Text style = {this.titleStyle(this.props.topic)} >{item.translated_title}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    container: {
        flex:1, 
        flexDirection: 'row', 
        alignContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 14,
        marginRight: 14
    },
    title: {
        flexWrap: 'wrap', 
        fontSize:12, 
        color:'pink',
        fontWeight: 'bold'
    }
}

const subjectColor = { 'science': '#c9347c',  
                            'math': '#12adcc', 
                            'economics-finance-domain': '#de7b12', 
                            'humanities': '#be2612',
                            'computing': '#20ab53'
                        }