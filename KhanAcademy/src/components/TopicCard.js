import React, { PropTypes} from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

const TopicCard = ({ item, subjectScreen}) => (
	<TouchableOpacity activeOpacity={0.8} onPress = {subjectScreen.bind(this, item)}>
		<View style={styles.cardContainer}>
			<Image resizeMode = 'stretch' source={{ uri: `${item.icon}`}} style={styles.cardImage} />
			<View style={styles.cardTitleContainer}>
				<Text style={styles.cardTitle}>
					{item.translated_title}
				</Text>
			</View>
		</View>
	</TouchableOpacity>
);

// TopicCard.propTypes = {
// 	info: PropTypes.object.isRequired,
// 	subjectScreen: PropTypes.func.isRequired
// };

const styles = StyleSheet.create({
	cardContainer: {
		//height: 86,
		width: 128,
		backgroundColor: 'white',
		flexDirection: 'column',
        marginRight: 10,
        marginBottom: 10
	},
	cardImage: {
        height: 78,
		width: 128,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 4
	},
	cardTitleContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	cardTitle: {
		color: 'gray',
		fontSize: 12,
		textAlign: 'left',
        paddingHorizontal: 1,
        marginTop: 6,
        marginLeft: 10
	}
});
export default TopicCard;