import { LogBox, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from './src/Utils/Colors'

import Navigation from './src/Navigation/Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { Utility } from './src/Utils/Utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppLoader from './src/Components/Loader'
import Loader from './src/Utils/AppLoader'

LogBox.ignoreAllLogs()

if (!__DEV__) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
  console.info = () => {}
  console.debug = () => {}
}

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Navigation />
        <AppLoader ref={(e) => Loader.setLoader(e)} />
        <Toast config={Utility.toastConfig} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})
