import { StyleSheet, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { Colors } from '../../Utils/Colors'
import { goBack } from '../../Navigation/NavigationServices'

const PreviewFeedBackScreen = () => {
  const onBackPress = () => {
    goBack()
  }
  return (
    <View style={styles.container}>
      <CommonHeader title={'Preview Feedback'} leftIcon={'arrow-left'} onLeftPress={onBackPress} />
    </View>
  )
}

export default PreviewFeedBackScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.background,
  },
})
