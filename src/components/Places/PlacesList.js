import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PlaceItem from './PlaceItem';

import { Colors } from '../../shared';

function PlacesList({ places }) {
	const navigation = useNavigation();

	function selectedPlaceHandler(id) {
		navigation.navigate('PlaceDetails', {
			placeId: id,
		});
	}

	if (!places || places.length === 0) {
		return (
			<View style={styles.fallbackContainer}>
				<Text style={styles.fallbackText}>
					No places added yet - start adding some!
				</Text>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.list}
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<PlaceItem place={item} onSelect={selectedPlaceHandler} />
			)}
		/>
	);
}

export default PlacesList;

const styles = StyleSheet.create({
	list: {
		margin: 24,
	},
	fallbackContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	fallbackText: {
		fontSize: 16,
		color: Colors.primary200,
	},
});