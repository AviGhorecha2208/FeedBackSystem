import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../Utils/Colors'
import { CommonStyles, CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'
import { moderateScale, scale, verticalScale } from '../Utils/Responsive'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import StarRating from './StarRating'

interface FeedBackListItemProps {
  feedback: {
    id: number
    name: string | null
    mobileNumber: string | null
    Address: string | null
    feedback: string | null
    service: { id: number; name: string } | null
    rating: number | null
    selectedMedia: string | null
  }
  onPress?: () => void
}

const FeedBackListItem = ({ feedback, onPress }: FeedBackListItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.serviceTag}>
          <Icon name={'tag'} size={16} color={Colors.primary} />
          <Text style={styles.serviceText}>{feedback.service?.name}</Text>
        </View>
        <StarRating rating={feedback.rating ?? 0} />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.infoRow}>
            <Icon name={'account'} size={20} color={Colors.primary} />
            <Text style={styles.infoText} numberOfLines={1}>
              {feedback.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name={'phone'} size={20} color={Colors.primary} />
            <Text style={styles.infoText}>{feedback.mobileNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name={'map-marker'} size={20} color={Colors.primary} />
            <Text style={styles.infoText} numberOfLines={2}>
              {feedback.Address}
            </Text>
          </View>
        </View>
        {feedback.selectedMedia && (
          <View style={styles.mediaContainer}>
            <Image source={{ uri: feedback.selectedMedia }} style={styles.mediaPreview} />
            {/* <View style={styles.playButton}>
              <Icon name='play' size={24} color={Colors.white} />
            </View> */}
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
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
    ...CommonStyles.shadow5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(15),
    gap: scale(5),
  },
  serviceText: {
    ...CommonStylesFn.text(3, Colors.primary, Fonts.medium),
  },
  content: {
    flexDirection: 'row',
    gap: scale(10),
  },
  userInfo: {
    flex: 1,
    gap: verticalScale(8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  infoText: {
    flex: 1,
    ...CommonStylesFn.text(3, Colors.black, Fonts.regular),
  },
  mediaContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlayBlack50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
