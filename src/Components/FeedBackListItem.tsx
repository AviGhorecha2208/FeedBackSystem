import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { CommonStyles, CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'
import { moderateScale, scale, verticalScale } from '../Utils/Responsive'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StarRating from './StarRating'
import { Feedback } from '../Types/CommonTypes'

interface FeedBackListItemProps {
  feedback: Feedback
  onPress?: () => void
}

const FeedBackListItem = ({ feedback, onPress }: FeedBackListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.serviceTag}>
          <Icon name={'tag'} size={18} color={Colors.primary} />
          <Text style={styles.serviceText}>{feedback.service?.name}</Text>
        </View>
        <StarRating rating={feedback.rating ?? 0} starSize={22} />
      </View>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={'account'} size={20} color={Colors.primary} />
            </View>
            <Text style={styles.infoText} numberOfLines={1}>
              {feedback.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Icon name={'phone'} size={20} color={Colors.primary} />
            </View>
            <Text style={styles.infoText}>{feedback.mobileNumber}</Text>
          </View>
        </View>
        {feedback.selectedMedia && (
          <View style={styles.mediaContainer}>
            <Image
              source={{ uri: feedback.selectedMedia }}
              style={styles.mediaPreview}
              resizeMode={'cover'}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default FeedBackListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    ...CommonStyles.shadow5,
    marginHorizontal: scale(2),
    marginVertical: verticalScale(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(20),
    gap: scale(6),
  },
  serviceText: {
    ...CommonStylesFn.text(3, Colors.primary, Fonts.medium),
    letterSpacing: 0.3,
  },
  content: {
    flexDirection: 'row',
    gap: scale(16),
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    gap: verticalScale(12),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  iconContainer: {
    width: scale(32),
    height: scale(32),
    borderRadius: moderateScale(16),
    backgroundColor: Colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
    ...CommonStylesFn.text(3.2, Colors.black, Fonts.regular),
  },
  mediaContainer: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: Colors.accentLight,
    ...CommonStyles.shadow5,
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
})
