import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Subject extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    getSubjects(item) {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${item.node_slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
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
            <View style = {{flex:1, alignContent: 'center', justifyContent: 'center'}}>
                <Text>{this.props.data.translated_title}</Text>
            </View>
        )
    }
}