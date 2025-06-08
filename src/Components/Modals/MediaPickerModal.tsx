import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, SCREEN_HEIGHT } from '../../Utils/Responsive'
import ReactNativeModal from 'react-native-modal'
import { Colors } from '../../Utils/Colors'
import { CommonStylesFn } from '../../Utils/CommonStyles'
import { Fonts } from '../../Utils/Fonts'
import { getCameraPermission } from '../../Utils/Utility'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { showToast } from '../../Utils/Utility'
import { ToastType } from '../../Utils/Const'
import ConfirmationModal from './ConfirmationModal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type MediaType = 'photo' | 'video' | 'mixed'

interface MediaPickerModalProps {
  isVisible: boolean
  onClose: () => void
  onMediaSelected: (res: ImagePickerResponse) => void
  mediaType?: MediaType
  title?: string
  maxDuration?: number
  quality?: 'low' | 'medium' | 'high'
  selectionLimit?: number
  onlyCamera?: boolean
}

const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isVisible,
  onClose,
  onMediaSelected,
  mediaType = 'photo',
  title,
  maxDuration = 60,
  quality = 'high',
  selectionLimit = 1,
  onlyCamera = false,
}) => {
  const [showCameraErrorModal, setShowCameraErrorModal] = useState<string>()
  const [showGalleryErrorModal, setShowGalleryErrorModal] = useState<string>()

  const clearError = () => {
    setShowCameraErrorModal(undefined)
    setShowGalleryErrorModal(undefined)
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
      mediaType: mediaType === 'mixed' ? 'mixed' : mediaType,
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
        onClose()
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
        onClose()
        clearError()
        const timeout = setTimeout(() => {
          setShowCameraErrorModal(err)
          clearTimeout(timeout)
        }, 350)
      }
    })
  }

  const openGallery = () => {
    launchImageLibrary({
      mediaType: mediaType === 'mixed' ? 'mixed' : mediaType,
      quality: 1,
      selectionLimit: selectionLimit,
      videoQuality: getVideoQuality(),
    })
      .then((res: ImagePickerResponse) => {
        if (res.errorCode || res.errorMessage) {
          showToast(
            ToastType.error,
            `give permission for gallery and error code is ${res.errorCode}`,
          )
        } else if (res?.assets) {
          if (onMediaSelected) {
            onMediaSelected(res)
          }
        }
      })
      .catch((err) => {
        console.log('Error opening gallery: ', err)
      })
      .finally(() => {
        onClose()
        clearError()
      })
  }

  const handleGalleryPermission = () => {
    if (
      showCameraErrorModal === 'granted' ||
      showCameraErrorModal === 'limited' ||
      showCameraErrorModal === 'denied'
    ) {
      onPressCamera()
      clearError()
    } else {
      clearError()
      Linking.openSettings()
    }
  }

  const getCameraActionText = () => {
    switch (mediaType) {
      case 'photo':
        return 'Take Photo'
      case 'video':
        return 'Record Video'
      default:
        return 'Capture'
    }
  }

  const getGalleryActionText = () => {
    switch (mediaType) {
      case 'photo':
        return 'Choose Photo from Gallery'
      case 'video':
        return 'Choose Video from Gallery'
      default:
        return 'Choose from Gallery'
    }
  }

  return (
    <>
      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isVisible}
        style={styles.modalContainer}
        onBackdropPress={onClose}
        backdropOpacity={0.5}
        useNativeDriverForBackdrop={true}
        deviceHeight={SCREEN_HEIGHT}
      >
        <View style={styles.modalContent}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}

          <TouchableOpacity style={styles.modalOption} onPress={onPressCamera}>
            <Icon name={'camera'} size={24} color={Colors.primary} />
            <Text style={styles.modalOptionText}>{getCameraActionText()}</Text>
          </TouchableOpacity>

          {!onlyCamera && (
            <TouchableOpacity style={styles.modalOption} onPress={openGallery}>
              <Icon name={'image'} size={24} color={Colors.primary} />
              <Text style={styles.modalOptionText}>{getGalleryActionText()}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <ConfirmationModal
        showModal={!!showCameraErrorModal}
        title={'To use the camera, please grant permission.'}
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
      <ConfirmationModal
        showModal={!!showGalleryErrorModal}
        title={'To use the gallery, please grant permission.'}
        negativeLabel={'Close'}
        positiveLabel={'Allow'}
        backdropColor={Colors.overlayBlack10}
        setShowModal={() => {
          setShowGalleryErrorModal(undefined)
        }}
        onPressNegative={() => {
          setShowGalleryErrorModal(undefined)
        }}
        onPressPositive={handleGalleryPermission}
      />
    </>
  )
}

export default MediaPickerModal

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(20),
  },
  modalTitle: {
    ...CommonStylesFn.text(4.5, Colors.black, Fonts.bold),
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(15),
  },
  modalOptionText: {
    ...CommonStylesFn.text(4, Colors.black),
    marginLeft: moderateScale(15),
  },
  cancelButton: {
    paddingVertical: moderateScale(15),
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  cancelText: {
    ...CommonStylesFn.text(4, Colors.red, Fonts.bold),
  },
})
