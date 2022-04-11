import { useState } from 'react';
import { Text, View, Alert, Image, StyleSheet } from 'react-native';
import {
	launchCameraAsync,
	useCameraPermissions,
	PermissionStatus,
} from 'expo-image-picker';

import OutlinedButton from '../UI/OutlinedButton';

import { Colors } from '../../shared';

function ImagePicked({ onTakeImage }) {
	const [pickedImage, setPickedImage] = useState();

	const [cameraPermissionInformation, requestPermission] =
		useCameraPermissions();

	async function verifyPermissions() {
		if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}

		if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
			Alert.alert(
				'Insufficient Permissions!',
				'You need to grant camera permissions to use this app.'
			);
			return false;
		}

		return true;
	}

	async function takeImageHandler() {
		const hasPermission = await verifyPermissions();

		if (!hasPermission) {
			return;
		}

		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		setPickedImage(image.uri);
		onTakeImage(image.uri);
	}

	let imagePreview = <Text style={{ color: 'white' }}>No image taken yet</Text>;

	if (pickedImage) {
		imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
	}

	return (
		<View>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<OutlinedButton icon='camera' onPress={takeImageHandler}>
				Take Image
			</OutlinedButton>
		</View>
	);
}

export default ImagePicked;

const styles = StyleSheet.create({
	imagePreview: {
		width: '100%',
		height: 200,
		marginVertical: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.primary700,
		borderWidth: 2,
		borderRadius: 4,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});