import { LogBox, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from './src/Utils/Colors'

import Navigation from './src/Navigation/Navigation'
import { persistor, store } from './src/Store/Store'
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PersistGate } from 'redux-persist/integration/react'
import Toast from 'react-native-toast-message'
import { Utility } from './src/Utils/Utility'
import { SafeAreaView } from 'react-native-safe-area-context'

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
      <StatusBar animated={true} backgroundColor={Colors.background} barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <Toast config={Utility.toastConfig} />
          </PersistGate>
        </Provider>
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
