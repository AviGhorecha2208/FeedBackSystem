import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../Utils/Colors'
import { moderateScale, verticalScale } from '../Utils/Responsive'
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

const MediaCapture = ({
  title = 'Record Video',
  selectedMedia,
  disabled,
  quality,
  maxDuration,
  onMediaSelected,
}: MediaCaptureProps) => {
  const [showCameraErrorModal, setShowCameraErrorModal] = useState<string>()

  const clearError = () => {
    setShowCameraErrorModal(undefined)
  }

  const getVideoQuality = () => {
    switch (quality) {
      case 'low':
        return 'low'
      case 'medium':
        return 'medium'
      case 'high':
        return 'high'
      default:
        return 'high'
    }
  }

  const openCamera = () => {
    launchCamera({
      mediaType: 'video',
      quality: 1,
      cameraType: 'back',
      videoQuality: getVideoQuality(),
      durationLimit: maxDuration,
    })
      .then((res) => {
        if (res.errorCode || res.errorMessage) {
          showToast(
            ToastType.error,
            `give permission for camera and error code is ${res.errorCode}`,
          )
        } else if (res?.assets) {
          if (onMediaSelected) {
            onMediaSelected(res)
          }
        }
        return []
      })
      .catch((err) => {
        console.log('Err: ', err)
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            disabled={disabled}
            onPress={onPressCamera}
          >
            {selectedMedia ? (
              <View style={styles.selectedMediaContainer}>
                <Image source={{ uri: selectedMedia }} style={styles.selectedMediaImage} />
              </View>
            ) : (
              <>
                <Icon name={'camera'} size={40} color={Colors.primary} />
                <Text style={styles.captureText}>{'Click to Record Video'}</Text>
              </>
            )}
          </TouchableOpacity>
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
