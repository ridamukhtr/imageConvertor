import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './app/Routes/AppNavigator'
import { Provider } from 'react-redux'
import { store } from './app/Redux/store'

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store} >
        <AppNavigator />
      </Provider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})