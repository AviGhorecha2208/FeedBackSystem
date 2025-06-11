import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../Utils/Colors'
import { Screens } from '../Utils/Const'
import { replace } from '../Navigation/NavigationServices'
import { heightPx, moderateScale, widthPx } from '../Utils/Responsive'
import { Fonts } from '../Utils/Fonts'

const StartupScreen = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      replace(Screens.CreateFeedBack)
      clearTimeout(timeout)
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Feedback System'}</Text>
    </View>
  )
}

export default StartupScreen

const styles = StyleSheet.create({
  container: {
    height: heightPx(100),
    width: widthPx(100),
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
})
