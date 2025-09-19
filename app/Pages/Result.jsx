import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import RMText from '../Components/RMText';
import useThemeManager from '../CustomHooks/useThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import Tts from 'react-native-tts';
import Share from 'react-native-share';
import {useFocusEffect} from '@react-navigation/native';

const Result = ({route}) => {
  const {item} = route.params;
  const {bgColor} = useThemeManager();
  console.log('itemmmm', item?.text);

  const [isSpeaking, setIsSpeaking] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log('leave screen');
        stopSpeaking();
      };
    }, []),
  );

  const copyToClipboard = () => {
    Clipboard.setString(item?.text);
  };

  const speakText = text => {
    Tts.speak(text);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    Tts.stop();
    setIsSpeaking(false);
  };

  const shareContent = async () => {
    try {
      const result = await Share.open({
        message: item?.text,
        url: item?.imageUri,
      });

      if (result?.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result?.action === Share.dismissedAction) {
        console.log('Share cancelled');
      }
    } catch (error) {
      if (error.message === 'User did not share') {
        console.log('User cancelled the share');
      } else {
        console.error('Share Error: ', error.message);
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{uri: item.imageUri}} style={styles?.image} />
        <View
          style={{
            width: '95%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 60,
          }}>
          <RMText textStyle={styles.text}>{item?.text}</RMText>
        </View>
      </ScrollView>
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="white" />
          </TouchableOpacity>
          {isSpeaking ? (
            <TouchableOpacity onPress={stopSpeaking}>
              <Ionicons
                name={'volume-mute-outline'}
                size={25}
                color={'white'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => speakText(item.text)}>
              <Ionicons
                name={'volume-high-outline'}
                size={25}
                color={'white'}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={shareContent}>
            <Ionicons name="share-social-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  headerText: {fontSize: 24, fontWeight: 'bold', marginBottom: 30},
  content: {alignItems: 'center'},
  image: {width: '100%', height: 250, resizeMode: 'contain', marginBottom: 20},
  text: {fontSize: 16},
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#332e2e',
    width: '70%',
    position: 'absolute',
    bottom: 10,
    height: 45,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
