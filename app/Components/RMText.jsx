import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useThemeManager from '../CustomHooks/useThemeManager'
import { selectedThemeSelector } from '../Redux/themeReducer'


const RMText = ({ children, header, selectable = false, numberOfLines, paragraph, textStyle }) => {  
  const dispatch = useDispatch()

  const { bgColor, textColor, fnToggleTheme, } = useThemeManager()
  const theme = useSelector(selectedThemeSelector)

    
    return (
        <Text
            allowFontScaling={false}
            selectable={selectable}
            numberOfLines={numberOfLines}
            style={[styles.paragraph(bgColor,textColor, fnToggleTheme), textStyle]}
            paragraph={paragraph}
        >
            {children}
        </Text>
    )
}

export default RMText

const styles = StyleSheet.create({
    paragraph:(bgColor, textColor)=>( {
        fontSize: 16, fontWeight: '500', backgroundColor:bgColor , color: textColor

    })
})