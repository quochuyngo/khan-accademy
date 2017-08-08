import React from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    Image,
    FlatList} from 'react-native';

export default class Video extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
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
        <View style = {{marginTop: 20}}> 
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
            <View style={styles.cell}> 
                <Image 
                    style={styles.imageCell}
                    source = {{uri: item.download_urls.png}}
                />
             <Text style={{flex:1, flexWrap: 'wrap'}}> {item.title} </Text>
            </View>
        )
    }

    renderSaperator() {
        return (
            <View 
                style = {{
                            height: 1,
                            width: "86%",
                            backgroundColor: "#CED0CE",
                            marginLeft: 10,
                            marginRight: 0,
                        }}> 

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },

    imageCell: {
        height: 50,
        width: 70,
        borderRadius: 4
    }
});