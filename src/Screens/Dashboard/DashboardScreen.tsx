import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CommonHeader from '../../Components/CommonHeader'
import { scale } from '../../Utils/Responsive'

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader
        title={`Dashboard`}
        leftIcon={''}
        onLeftPress={() => {}}
        rightIcon={''}
        onRightPress={() => {}}
      />
      <View style={styles.subContainer}></View>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.background,
  },
  subContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: scale(16),
  },
})
