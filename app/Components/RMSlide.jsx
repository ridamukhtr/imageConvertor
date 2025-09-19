import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import RMText from './RMText'
import Entypo from 'react-native-vector-icons/Entypo'

const RMSlide = ({iconName, iconSize, onPress,containerStyle, children, imgSrc, imgStyle }) => {
  return (
    <View >
       <View style={[styles.slideContainer, containerStyle]} >
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <RMText textStyle={{ backgroundColor: 'none', color: '#fff' }}>{children}</RMText>
          </View>
        </View>
    </View>
  )
}

export default RMSlide

const styles = StyleSheet.create({
    slideContainer:{ width: '95%', height: 50, justifyContent: 'center', paddingHorizontal: 15, marginHorizontal: 10, borderRadius: 10, }
})