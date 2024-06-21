import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import ViewFlexBox from './ViewFlexBox';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

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

    return (
        <View style={{ width: '90%', marginHorizontal: 20, marginTop: 20 }}>
            <Text style={styles.text}>Welcome To</Text>
            <Text style={styles.txt}>Image to Text</Text>
            <View style={styles.Container}>
                <ViewFlexBox iconColor={'#A28CFF'} iconSize={30}  icon={'camera'} text={'Camera'} style={{ backgroundColor: '#ebe8f7' }} />
                <ViewFlexBox iconColor={'#61c0dd'} iconSize={30} icon={'photo'} text={'Gallery'}  style={{ backgroundColor: '#edf5f7' }} onPress={pickImage}  />
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight: '400',
        fontSize: 20,
    },
    txt: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#ffff',
    },
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});
