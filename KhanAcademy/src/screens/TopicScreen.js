import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet, 
    View, 
    Text, 
    Image,
    FlatList,
    NavigatorIOS, 
    TouchableHighlight,
    Button
    } from 'react-native';

import Detail from './DetailScreen.js'

export default class NavigatorApp extends React.Component {
    render() {
        return (
            <NavigatorIOS 
                initialRoute = {{
                    component: Topic,
                    title: 'Videos'
                }}
                style={{flex: 1}}
            />
        )
    }

} 
export class Topic extends React.Component {
    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     navigator: PropTypes.object.isRequired,
    // }
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    
    onNext() {
        this.props.navigator.push ({
            component: Detail,
            title: 'Detail'
        })
    }
    onNextScreen = (data) => {
        this.props.navigator.push({
            component: Detail,
            title: 'Detail',
            passProps: {
                data: data
            }
        })
    }

    getVideoFromApiAsync() {
        return fetch('http://www.khanacademy.org/api/v1/topic/banking-and-money/videos')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({data: responseJson})
        })
        .catch ((error) => {
            console.error(error)
        })
    } 
    componentDidMount() {
        this.getVideoFromApiAsync()
    }

    render(){
        return (
        <View> 
            <FlatList
                data = {this.state.data}
                keyExtractor = {(x, i) => i}
                renderItem = {({item})=> 
                    this.renderVideoCell(item)
                }
                ItemSeparatorComponent = {this.renderSaperator}
            />
        </View>
    )}

    renderVideoCell(item) {
        return (
            <TouchableHighlight onPress={() => {this.onNextScreen(item)}}>
            <View style={styles.cell}> 
                <Image 
                    style={styles.imageCell}
                    source = {{uri: item.download_urls.png}}
                />
                <View style = {styles.cell}> 
                    <Text style={{flex:1, flexWrap: 'wrap'}}> {item.title} </Text>
                </View>
            </View>
            </TouchableHighlight>
        )
    }

    renderSaperator() {
        return (
            <View 
                style = {{
                            height: 1,
                            backgroundColor: '#CED0CE',
                            marginLeft: 10,
                            marginRight: 10,
                
                        }}> 

            </View>
        )
    }
}

export class ListItem extends React.PureComponent {
    onPress = () => {
        this.props.onPressItem(this.props.id)
    }
}
const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        margin: 10
    },

    imageCell: {
        height: 50,
        width: 70,
        borderRadius: 4
    },
    info: {
        flex: 1,
        flexGrow: 1,
        width: 0,
        marginLeft: 10,
    }
});