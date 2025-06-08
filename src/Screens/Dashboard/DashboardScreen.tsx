import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../Utils/Colors'
import CommonHeader from '../../Components/CommonHeader'
import { scale, verticalScale } from '../../Utils/Responsive'
import CommonButton from '../../Components/CommonButton'
import { push } from '../../Navigation/NavigationServices'
import { Screens } from '../../Utils/Const'

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title={'Dashboard'} />
      <View style={styles.subContainer}>
        <CommonButton
          label={'Create Feedback'}
          onPress={() => {
            push(Screens.CreateFeedBack)
          }}
          leftIcon={'plus'}
        />
        <CommonButton
          label={'Feedback List'}
          onPress={() => {
            push(Screens.FeedBackList)
          }}
          leftIcon={'format-list-bulleted'}
        />
      </View>
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
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    gap: verticalScale(16),
  },
})
