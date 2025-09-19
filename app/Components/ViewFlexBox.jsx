import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RMText from './RMText';


const ViewFlexBox = ({ icon, style, text, iconSize, iconColor, textStyle, onPress }) => {
    return (
        <>
            <TouchableOpacity style={[styles.touchable,]} onPress={onPress}>
                <View style={[styles.containerBody, style]}>
                    <FontAwesome name={icon} size={iconSize} color={iconColor} />
                </View>
                <RMText style={[styles.txt1, textStyle]}>{text}</RMText>
            </TouchableOpacity>
        </>
    )
}

export default ViewFlexBox

const styles = StyleSheet.create({
    touchable: {
        width: '48%',
        height: 120,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt1: { color: '#fff', fontSize: 14, fontWeight: '500', },
    // bgcolor: e1dcf7,  edf5f7
    containerBody: { backgroundColor: '#edf5f7', width: '30%', height: 50, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginVertical: 10, },

})