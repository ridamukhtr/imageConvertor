// import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import useThemeManager from '../CustomHooks/useThemeManager';
// import RMText from '../Components/RMText';
// import Clipboard from '@react-native-clipboard/clipboard';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import TextRecognition from 'react-native-text-recognition';

// const UploadedFiles = ({ route }) => {
//     const { imageUri } = route?.params;
//     const [recognizedText, setRecognizedText] = useState(null);
//     const { bgColor } = useThemeManager();

//     const recognizeText = async () => {
//         if (imageUri) {
//             try {
//                 const result = await TextRecognition.processImage(imageUri);
//                 setRecognizedText(result.text);
//                 saveData(imageUri, result.text);
//             } catch (error) {
//                 console.error('Text Recognition Error: ', error);
//             }
//         }
//     };

//     const saveData = async (imageUri, text) => {
//         try {
//             const existingData = await AsyncStorage.getItem('savedData');
//             const data = existingData ? JSON.parse(existingData) : [];
//             data.push({ imageUri, text });
//             await AsyncStorage.setItem('savedData', JSON.stringify(data));
//             console.log('Data saved successfully');
//         } catch (error) {
//             console.error('AsyncStorage Save Error: ', error);
//         }
//     };

//     const copyToClipboard = () => {
//         Clipboard.setString(recognizedText);
//     };

//     return (
//         <View style={{ flex: 1, padding: 10, justifyContent: "space-between", backgroundColor: bgColor }}>
//             <View style={styles.body}>
//                 {imageUri ? (
//                     <View style={styles.imgContainer}>
//                         <View style={styles.imgBody}>
//                             <Image source={{ uri: imageUri }} style={styles.image} />
//                         </View>
//                     </View>
//                 ) : (
//                     <Text style={styles.text}>NO Image</Text>
//                 )}

//                 {recognizedText && (
//                     <View style={styles.textContainer}>
//                         <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
//                             <TouchableOpacity onPress={copyToClipboard}>
//                                 <Ionicons name="copy-outline" size={24} color="white" />
//                             </TouchableOpacity>
//                         </View>
//                         <ScrollView>
//                             <Text style={styles.recognizedText}>{recognizedText}</Text>
//                             <View style={{ marginBottom: 70 }}></View>
//                         </ScrollView>
//                     </View>
//                 )}
//             </View>
//             <TouchableOpacity onPress={recognizeText} style={styles.btn}>
//                 <Text style={{ color: 'white' }}>Proceed</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default UploadedFiles;

// const styles = StyleSheet.create({
//     body: { justifyContent: 'space-between', width: '95%', marginHorizontal: 10 },
//     slideContainer: { width: '100%', height: 70, alignItems: 'center', margin: 10, backgroundColor: '#332e2e', borderRadius: 10 },
//     text: { fontSize: 24, margin: 10 },
//     imgContainer: { width: '100%', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//     btn: { width: '100%', borderRadius: 10, backgroundColor: '#A28CF0', height: 40, justifyContent: 'center', alignItems: "center" },
//     imgBody: { width: '60%', marginHorizontal: 10, alignItems: "center", flexDirection: 'row' },
//     image: { width: 70, height: 60, resizeMode: 'contain' },
//     textContainer: { height: 250, marginVertical: 20, padding: 15, backgroundColor: '#333', borderRadius: 5 },
//     recognizedText: { fontSize: 16, color: 'white' },
// });


import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import useThemeManager from '../CustomHooks/useThemeManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadedFiles = ({ route }) => {
    const { imageUri } = route?.params;
    const [recognizedText, setRecognizedText] = useState(null);
    const { bgColor } = useThemeManager();
    const [isProcessing, setIsProcessing] = useState(false); // Track button disable status

    const recognizeText = async () => {
        if (imageUri) {
            setIsProcessing(true); // Permanently disable the button
            try {
                const result = await TextRecognition.recognize(imageUri);
                const text = result.join('\n');
                setRecognizedText(text);
                await saveData(imageUri, text);
            } catch (error) {
                console.error('Text Recognition Error: ', error);
            }
        }
    };

    const saveData = async (imageUri, text) => {
        try {
            const existingData = await AsyncStorage.getItem('savedData');
            const data = existingData ? JSON.parse(existingData) : [];
            data.push({ imageUri, text });
            await AsyncStorage.setItem('savedData', JSON.stringify(data));
            console.log('Data saved successfully');
        } catch (error) {
            console.error('AsyncStorage Save Error: ', error);
        }
    };

    const copyToClipboard = () => {
        Clipboard.setString(recognizedText);
    };

    return (
        <View style={{ flex: 1, padding: 10, justifyContent: "space-between", backgroundColor: bgColor }}>
            <View style={styles.body}>
                {imageUri ? (
                    <View style={styles.imgContainer}>
                        <View style={styles.imgBody}>
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        </View>
                    </View>
                ) : (
                    <Text style={styles.text}>No Image</Text>
                )}

                {recognizedText && (
                    <View style={styles.textContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={copyToClipboard}>
                                <Ionicons name="copy-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <Text style={styles.recognizedText}>{recognizedText}</Text>
                            <View style={{ marginBottom: 70 }}></View>
                        </ScrollView>
                    </View>
                )}
            </View>
            <TouchableOpacity
                onPress={recognizeText}
                style={[
                    styles.btn,
                    isProcessing && styles.disabledBtn, // Apply disabled style if clicked
                ]}
                disabled={isProcessing} // Disable the button permanently after one click
            >
                <Text style={{ color: 'white' }}>
                    {isProcessing ? 'Processing successfully' : 'Proceed'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadedFiles;
 
const styles = StyleSheet.create({
    body: { justifyContent: 'space-between', width: '95%', marginHorizontal: 10 },
    slideContainer: { width: '100%', height: 70, alignItems: 'center', margin: 10, backgroundColor: '#332e2e', borderRadius: 10 },
    text: { fontSize: 24, margin: 10 },
    imgContainer: { width: '100%', height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    btn: { width: '100%', borderRadius: 10, backgroundColor: '#A28CF0', height: 40, justifyContent: 'center', alignItems: 'center' },
    disabledBtn: {  backgroundColor:"#b19ff4" }, 
    imgBody: { width: '60%', marginHorizontal: 10, alignItems: 'center', flexDirection: 'row' },
    image: { width: 70, height: 60, resizeMode: 'contain' },
    textContainer: { height: 250, marginVertical: 20, padding: 15, backgroundColor: '#333', borderRadius: 5 },
    recognizedText: { fontSize: 16, color: 'white' },
});
