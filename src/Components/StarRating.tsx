import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../Utils/Colors'
import { scale, verticalScale } from '../Utils/Responsive'
import { CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'

interface StarRatingProps {
  rating: number | null
  onRatingChange?: (rating: number) => void
  title?: string
}

const StarRating = ({ rating, onRatingChange, title = 'Select Rating' }: StarRatingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onRatingChange && onRatingChange(star)}
            disabled={!onRatingChange}
          >
            <Icon
              name={(rating ?? 0) >= star ? 'star' : 'star-o'}
              size={30}
              color={Colors.primary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default StarRating

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    gap: verticalScale(10),
    alignItems: 'flex-start',
  },
  title: {
    ...CommonStylesFn.text(3.5, Colors.primary, Fonts.medium),
  },
  starsContainer: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
  },
})
