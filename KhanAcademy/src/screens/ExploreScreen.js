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
    TouchableHighlight,
    Dimensions
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
            [{ name: 'Science', slug: 'science', data: [{}] },
            { name: 'Math', slug: 'math', data: [{}] },
            { name: 'Economics and finance', slug: 'economics-finance-domain', data: [{}] },
            { name: 'Arts and humanities', slug: 'humanities', data: [{}] },
            { name: 'Computing', slug: 'computing', data: [{}] }
            ],
        }
        this.onNextScreen = this.onNextScreen.bind(this)
    }

    onNextScreen = (data, topic) => {
        this.props.navigator.push({
            component: Subject,
            title: `${data.translated_title}`,
            passProps: {
                data: data,
                topic: topic  
            }
        })
    }

    //let newSubjects = Object.assign({}, this.state.subjects)
    getSubjects() {
        let {subjects} = this.state
        subjects.map((subject) => {
            return fetch(`http://www.khanacademy.org/api/v1/topic/${subject.slug}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    let {subjects} = this.state
                    let index = subjects.indexOf(subject)
                    subjects[index].data = responseJson.children
                    this.setState({ subjects: subjects })
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }
    componentDidMount() {
        this.getSubjects()
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <Image style={styles.cover}
                            source={require("../../assets/images/cover1.jpg")}
                            resizeMode='cover' />
                    </View>
                    {this.state.subjects.map((subject) => {
                        return (
                            <View>
                                <Text style={styles.subjectTitle}> {subject.name} </Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={subject.data}
                                    keyExtractor={(x, i) => i}
                                    renderItem={({ item }) =>
                                        this.renderCell(item, subject.slug)
                                    }
                                />
                                <View style = {{backgroundColor: '#eeecec', height: 0.5, marginBottom:14}}></View>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    renderCell(item, topic) {
        return (
            <TopicCard item={item} topic = {topic} subjectScreen={this.onNextScreen} />
        )
    }
}

const styles = StyleSheet.create({
    subjectTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 6
    },

    cover: {
        marginBottom: 10,
        height: 176,
        width: Dimensions.get("window").width
    },
});