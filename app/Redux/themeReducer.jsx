import { createSlice } from "@reduxjs/toolkit";


export const slice =  createSlice({
    name:'themeReducer',
    initialState:{
        theme: 'dark'
    },
    reducers:{
        changeTheme:(state, action) =>{
            state.theme = action.payload
        }
    }
})

export const {changeTheme} = slice.actions
export const selectedThemeSelector =(state)=> state.themeReducer.theme
export default slice.reducer