import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Appearance } from "react-native"
import { changeTheme, selectedThemeSelector } from "../Redux/themeReducer"



export default function () {

    const dispatch = useDispatch()
    const currentTheme = useSelector(selectedThemeSelector)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            dispatch(changeTheme(colorScheme))
        });
        return () => subscription.remove();
    }, [])


    const bgColor = currentTheme == 'dark' ? 'black' : '#fff'
    const textColor = currentTheme == 'dark' ? '#fff' : 'black'
    const heading = currentTheme == 'dark' ? 'white' : 'blue'
    const fnToggleTheme = () => {
      
        const newTheme = currentTheme == 'dark' ? 'light' : 'dark'

        dispatch(changeTheme(newTheme))
    }



    return {

        currentTheme,
        bgColor,
        textColor,
        heading,

        fnToggleTheme,

    }
}