import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../Utils/Colors'
import { moderateScale, verticalScale } from '../Utils/Responsive'
import { CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'

interface MediaCaptureProps {
  onPress: () => void
  title?: string
  selectedMedia?: string | null
}

const MediaCapture = ({ onPress, title = 'Record Video', selectedMedia }: MediaCaptureProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={onPress}>
          {selectedMedia ? (
            <View style={styles.selectedMediaContainer}>
              <Image source={{ uri: selectedMedia }} style={styles.selectedMediaImage} />
            </View>
          ) : (
            <>
              <Icon name={'camera'} size={40} color={Colors.primary} />
              <Text style={styles.captureText}>{'Click to upload Video'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MediaCapture

const styles = StyleSheet.create({
  container: {
    height: moderateScale(150),
    marginTop: verticalScale(20),
    gap: verticalScale(10),
    alignItems: 'flex-start',
  },
  title: {
    ...CommonStylesFn.text(3.5, Colors.primary, Fonts.medium),
  },
  captureContainer: {
    width: '100%',
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: moderateScale(10),
    backgroundColor: Colors.accentLight,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
  },
  captureText: {
    ...CommonStylesFn.text(3, Colors.primary, Fonts.regular),
    marginTop: verticalScale(10),
  },
  selectedMediaContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  selectedMediaImage: {
    flex: 1,
  },
})
