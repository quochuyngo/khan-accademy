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

import Detail from './DetailScreen'
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
            component: Detail,
            title: `${data.translated_title}`,
            passProps: {
                data: data
            }
        })
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
        return (
            <View style = {{flex:1, marginTop: 64}}>
                <Image style = {styles.cover}
                  source = {{uri: this.props.data.icon}}
                  resizeMode = 'cover'//'stretch'
                />
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
                <Image style = {{height: 30, width: 30, borderRadius: 15}}
                    source = {{uri: item.icon?item.icon:require("../../assets/images/cover1.jpg")}}
                />
                <View style = {styles.container}>
                    <Text style = {styles.title} >{item.translated_title}</Text>
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
    cover: {
        marginBottom: 0,
        height: 168,
        width: Dimensions.get("window").width
    },
    title: {
        flexWrap: 'wrap', 
        fontSize:12, 
        color:'pink',
        fontWeight: 'bold'
    }
}