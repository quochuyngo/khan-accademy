import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    NavigatorIOS,
    TouchableHighlight
} from 'react-native';

import TopicCard from '../components/TopicCard.js'
import Subject from './SubjectScreen.js'
export default class NavigatorApp extends React.Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: Explore,
                    title: 'Explore'
                }}
                style={{ flex: 1 }}
            />
        )
    }
}

export class Explore extends React.Component {
    constructor() {
        super()
        this.state = {
            subjects: 
                [{ name: 'Science', slug: 'science', data:[] },
                { name: 'Math', slug: 'math',data:[] },
                { name: 'Economics and finance', slug: 'economics-finance-domain',data:[]},
                { name: 'Arts and humanities', slug: 'humanities',data:[] },
                { name: 'Computing', slug: 'computing',data:[] }
                ],
        }
        this.onNextScreen = this.onNextScreen.bind(this)
    }
    
    onNextScreen = (data) => {
        this.props.navigator.push({
            component: Subject,
            title: `${data.translated_title}`,
            passProps: {
                data: data
            }
        })
    }

    getScience() {
        return fetch(`http://www.khanacademy.org/api/v1/topic/${this.state.subjects[0].slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = Object.assign({}, this.state.subjects)
            newSubjects[0].data = responseJson.children
            this.setState({subjects: newSubjects})
        })
        .catch ((error) => {
            console.error(error)
        })
    }

    getMath() {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${this.state.subjects[1].slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = Object.assign({}, this.state.subjects)
            newSubjects[1].data = responseJson.children
            this.setState({subjects: newSubjects})
        })
        .catch ((error) => {
            console.error(error)
        })
    }

    getComputing() {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${this.state.subjects[2].slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = Object.assign({}, this.state.subjects)
            newSubjects[2].data = responseJson.children
            this.setState({subjects: newSubjects})
        })
        .catch ((error) => {
            console.error(error)
        })
    }

    getArt() {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${this.state.subjects[3].slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = Object.assign({}, this.state.subjects)
            newSubjects[3].data = responseJson.children
            this.setState({subjects: newSubjects})
        })
        .catch ((error) => {
            console.error(error)
        })
    }

    getEconomics() {
         return fetch(`http://www.khanacademy.org/api/v1/topic/${this.state.subjects[4].slug}`)
        .then((response) => response.json())
        .then((responseJson) => {
            let newSubjects = Object.assign({}, this.state.subjects)
            newSubjects[4].data = responseJson.children
            this.setState({subjects: newSubjects})
        })
        .catch ((error) => {
            console.error(error)
        })
    }
    componentDidMount() {
         this.getScience()
         this.getEconomics()
         this.getMath()
         this.getComputing()
         this.getArt()
     }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Image style = {{height: 160, marginBottom: 10}}
                            source = {require("../../assets/images/cover1.jpg")}
                            resizeMode = 'cover'/>
                        <Text style = {styles.subjectTitle}> {this.state.subjects[0].name} </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={this.state.subjects[0].data}
                            keyExtractor={(x, i) => i}
                            renderItem = {({item})=> 
                                this.renderCell(item)
                            }
                        />
                    </View>

                     <View>
                        <Text style = {styles.subjectTitle}> {this.state.subjects[1].name} </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={this.state.subjects[1].data}
                            keyExtractor={(x, i) => i}
                            renderItem = {({item})=> 
                                this.renderCell(item)
                            }
                        />
                    </View>

                    <View>
                        <Text style = {styles.subjectTitle}> {this.state.subjects[2].name} </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={this.state.subjects[2].data}
                            keyExtractor={(x, i) => i}
                            renderItem = {({item})=> 
                                this.renderCell(item)
                            }
                        />
                    </View>

                    <View>
                        <Text style = {styles.subjectTitle}> {this.state.subjects[3].name} </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={this.state.subjects[3].data}
                            keyExtractor={(x, i) => i}
                            renderItem = {({item})=> 
                                this.renderCell(item)
                            }
                        />
                    </View> 

                    <View>
                        <Text style = {styles.subjectTitle}> {this.state.subjects[4].name} </Text>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator = {false}
                            data={this.state.subjects[4].data}
                            keyExtractor={(x, i) => i}
                            renderItem = {({item})=> 
                                this.renderCell(item)
                            }
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderCell(item) {
        return (
            <TopicCard item = {item} subjectScreen = {this.onNextScreen}/>
        )
    }

    // renderCell(item) {
    //     return (
    //         //<TouchableHighlight onPress={() => {this.onNextScreen(item)}}>
    //         <View style={styles.cell}> 
    //              <Image 
    //                 style={styles.imageCell}
    //                 source = {{uri: `${item.icon}`}}
    //             /> 
    //             <View style = {{flex:1}}> 
    //                  <Text style = {styles.topicTitle}>{item.translated_title}</Text>
    //             </View>
    //         </View>
    //         //</TouchableHighlight>
    //     )
    // }
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        margin: 10
    },

    cellHorizontal: {
        flex: 1,
        flexDirection: 'row',
        //alignItems: 'center',
        //justifyContent: 'center',
        height: 50,
        margin: 10
    },

    subjectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6
    },
    canvas: {
        margin: 0,
        height: 160
    },

    info: {
        flex: 1,
        flexGrow: 1,
        width: 0,
        marginLeft: 10,
    }
});