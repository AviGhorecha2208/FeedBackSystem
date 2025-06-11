import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../Utils/Colors'
import { moderateScale, scale, verticalScale } from '../Utils/Responsive'
import { CommonStylesFn } from '../Utils/CommonStyles'
import { Fonts } from '../Utils/Fonts'
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker'
import ConfirmationModal from './Modals/ConfirmationModal'
import { getCameraPermission, showToast } from '../Utils/Utility'
import { ToastType } from '../Utils/Const'

interface MediaCaptureProps {
  title?: string
  selectedMedia?: string | null
  quality?: 'low' | 'medium' | 'high'
  maxDuration?: number
  disabled?: boolean
  onMediaSelected?: (res: ImagePickerResponse) => void
}

const MAX_DURATION = 60 // 1 minute in seconds

const MediaCapture = ({
  title = 'Record Video',
  selectedMedia,
  disabled,
  quality = 'high',
  maxDuration = MAX_DURATION,
  onMediaSelected,
}: MediaCaptureProps) => {
  const [showCameraErrorModal, setShowCameraErrorModal] = useState<string>()

  const clearError = () => {
    setShowCameraErrorModal(undefined)
  }

  const validateVideo = (response: ImagePickerResponse) => {
    if (!response.assets?.[0]) {
      return false
    }

    const video = response.assets[0]
    if (video.duration && video.duration > maxDuration) {
      showToast(ToastType.error, `Video should be less than ${maxDuration} seconds`)
      return false
    }
    return true
  }

  const openCamera = () => {
    launchCamera({
      mediaType: 'video',
      quality: 0.8,
      cameraType: 'back',
      videoQuality: quality,
      durationLimit: maxDuration,
    })
      .then((res) => {
        if (res.errorCode || res.errorMessage) {
          showToast(ToastType.error, 'Please provide camera permission to record video')
        } else if (res?.assets) {
          if (validateVideo(res) && onMediaSelected) {
            onMediaSelected(res)
          }
        }
        return []
      })
      .catch((err) => {
        console.log('Err: ', err)
        showToast(ToastType.error, 'Failed to record video')
      })
      .finally(() => {
        clearError()
      })
  }

  const handleCameraPermission = () => {
    if (
      showCameraErrorModal === 'granted' ||
      showCameraErrorModal === 'limited' ||
      showCameraErrorModal === 'denied'
    ) {
      onPressCamera()
      clearError()
    } else {
      console.log('Error getting camera permission: ', showCameraErrorModal)
      clearError()
      Linking.openSettings()
    }
  }

  const onPressCamera = () => {
    getCameraPermission(openCamera).catch((err) => {
      if (err) {
        clearError()
        const timeout = setTimeout(() => {
          setShowCameraErrorModal(err)
          clearTimeout(timeout)
        }, 350)
      }
    })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{`(Max ${maxDuration} seconds)`}</Text>
        </View>
        <View style={styles.captureContainer}>
          {selectedMedia ? (
            <View style={styles.previewRow}>
              <View style={styles.selectedPreviewContainer}>
                <Image source={{ uri: selectedMedia }} style={styles.selectedMediaImage} />
              </View>
              <TouchableOpacity style={styles.retakeButton} onPress={onPressCamera}>
                <Icon name={'camera-retake'} size={24} color={Colors.primary} />
                <Text style={styles.retakeText}>{'Retake'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                disabled={disabled}
                onPress={onPressCamera}
              >
                <Icon name={'video'} size={32} color={Colors.primary} />
                <Text style={styles.buttonText}>{'Record Video'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ConfirmationModal
        showModal={!!showCameraErrorModal}
        title={'Need Permission'}
        subTitle={'Please grant permission to use the camera.'}
        negativeLabel={'Close'}
        positiveLabel={'Allow'}
        backdropColor={Colors.overlayBlack10}
        setShowModal={() => {
          setShowCameraErrorModal(undefined)
        }}
        onPressNegative={() => {
          setShowCameraErrorModal(undefined)
        }}
        onPressPositive={handleCameraPermission}
      />
    </>
  )
}

export default MediaCapture

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    gap: verticalScale(10),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  title: {
    ...CommonStylesFn.text(3.5, Colors.primary, Fonts.medium),
  },
  subtitle: {
    ...CommonStylesFn.text(3, Colors.primary, Fonts.regular),
  },
  captureContainer: {
    width: '100%',
    height: verticalScale(120),
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: Colors.accentLight,
    padding: moderateScale(8),
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
  },
  buttonContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: scale(12),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    ...CommonStylesFn.text(3, Colors.primary, Fonts.medium),
    marginTop: verticalScale(4),
  },
  selectedPreviewContainer: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  selectedMediaImage: {
    width: '100%',
    height: '100%',
  },
  retakeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: scale(8),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: scale(2),
  },
  retakeText: {
    ...CommonStylesFn.text(2.8, Colors.primary, Fonts.medium),
  },
})
