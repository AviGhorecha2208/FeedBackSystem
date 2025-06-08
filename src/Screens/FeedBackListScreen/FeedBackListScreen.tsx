import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { Colors } from '../../Utils/Colors'
import { goBack, navigate } from '../../Navigation/NavigationServices'
import { useAppSelector } from '../../hooks/StoreHooks'
import FeedBackListItem from '../../Components/FeedBackListItem'
import { Screens } from '../../Utils/Const'
import { scale, verticalScale } from '../../Utils/Responsive'

const FeedBackListScreen = () => {
  const feedbacks = useAppSelector((state) => state.Feedbacks.feedbacks)

  const onBackPress = () => {
    goBack()
  }

  const onPressFeedback = (feedback: (typeof feedbacks)[0]) => {
    navigate(Screens.PreviewFeedBack, { feedback, isFromCreate: false })
  }

  return (
    <View style={styles.container}>
      <CommonHeader title={'Feedback List'} leftIcon={'arrow-left'} onLeftPress={onBackPress} />

      <FlatList
        data={feedbacks}
        renderItem={({ item }) => (
          <FeedBackListItem feedback={item} onPress={() => onPressFeedback(item)} />
        )}
        keyExtractor={(item) =>
          `${item?.name}${item.mobileNumber}${item.service?.name}${item.rating}${item.selectedMedia}`
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default FeedBackListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingHorizontal: scale(10),
    gap: verticalScale(10),
    paddingVertical: verticalScale(20),
  },
})
