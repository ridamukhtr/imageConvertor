import { StyleSheet, View, PermissionsAndroid } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import ViewFlexBox from '../Components/ViewFlexBox';
import RMText from '../Components/RMText';
import useThemeManager from '../CustomHooks/useThemeManager';

const Home = () => {
    const navigation = useNavigation();
    const {bgColor} = useThemeManager();

    const pickImage = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
            } else if (response.assets && response.assets.length > 0) {
                const source = response.assets[0].uri;
                navigation.navigate('UploadedFiles', { imageUri: source });
                console.log('Image URI: ', source);
            }
        });
    };

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission to take photos',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
    };

    const openCamera = async () => {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
          launchCamera({}, response => {
            if (response.assets && response.assets.length > 0) {
                const imageSrc = response.assets[0].uri;
                navigation.navigate('UploadedFiles', { imageUri: imageSrc });
              console.log(response.assets[0].uri);
            } else if (response.errorMessage) {
              console.error('Camera error:', response.errorMessage);
            } else if (response.didCancel) {
              console.log('User cancelled camera');
            }
          });
        } else {
          Alert.alert('Permission denied', 'You need to grant camera permission to take photos.');
        }
    };

    return (
        <View style={{flex:1, backgroundColor:bgColor }}>
            <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20, }}>
                <RMText textStyle={styles.text}>Welcome To</RMText>
                <RMText textStyle={styles.txt}>Image to Text</RMText>
                <View style={styles.Container}>
                    <ViewFlexBox iconColor={'#A28CFF'} iconSize={30} icon={'camera'} text={'Camera'} style={{ backgroundColor: '#ebe8f7' }} onPress={openCamera}/>
                    <ViewFlexBox iconColor={'#61c0dd'} iconSize={30} icon={'photo'} text={'Gallery'} style={{ backgroundColor: '#edf5f7' }} onPress={pickImage} />
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    text: {
        fontWeight: '400',
        fontSize: 24,
    },
    txt: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});
