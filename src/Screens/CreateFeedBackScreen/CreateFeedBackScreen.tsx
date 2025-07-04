import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { Colors } from '../../Utils/Colors'
import CommonTextInput from '../../Components/CommonTextInput'
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive'
import { Service, ToastType } from '../../Utils/Const'
import { CommonStylesFn } from '../../Utils/CommonStyles'
import { Fonts } from '../../Utils/Fonts'
import StarRating from '../../Components/StarRating'
import MediaCapture from '../../Components/MediaCapture'
import { ImagePickerResponse } from 'react-native-image-picker'
import CommonButton from '../../Components/CommonButton'
import { showToast, Utility } from '../../Utils/Utility'

import { AddFeedbackPayload, Feedback } from '../../Types/CommonTypes'
import { addFeedback } from '../../Apis/feedback'

interface Service {
  id: number
  name: string
}

const initialFeedbackState: Feedback = {
  name: null,
  mobileNumber: null,
  service: null,
  rating: null,
  selectedMedia: null,
}

const CreateFeedBackScreen = () => {
  const [feedback, setFeedback] = useState(initialFeedbackState)

  const onChangeText = (key: keyof typeof initialFeedbackState, value: string | null) => {
    if (key === 'mobileNumber' && value) {
      if (!/^[0-9]*$/.test(value)) {
        showToast(ToastType.error, 'Please enter only numbers')
        return
      }
    }
    setFeedback({ ...feedback, [key]: value })
  }

  const onSelectService = (item: (typeof Service)[0]) => {
    setFeedback({ ...feedback, service: item })
  }

  const onSelectRating = (rating: number) => {
    setFeedback({ ...feedback, rating })
  }

  const onMediaSelected = async (response: ImagePickerResponse) => {
    if (response.assets && response.assets[0]) {
      setFeedback({ ...feedback, selectedMedia: response.assets[0].uri ?? null })
      // const awsResponse = await uploadMediaToAws(response.assets[0])
      // if (awsResponse) {
      //   setFeedback({ ...feedback, selectedMedia: awsResponse.alr })
      // }
    }
  }

  const onPressClear = () => {
    setFeedback(initialFeedbackState)
  }

  const onPressSubmit = async () => {
    if (
      !feedback.name ||
      !feedback.mobileNumber ||
      !feedback.service ||
      !feedback.rating ||
      !feedback.selectedMedia
    ) {
      showToast(ToastType.error, 'Please fill all the fields')
      return
    }

    if (!Utility.validateMobileNumber(feedback.mobileNumber)) {
      showToast(ToastType.error, 'Please enter a valid 10-digit mobile number')
      return
    }

    const payload: AddFeedbackPayload = {
      name: feedback.name,
      mobileNumber: feedback.mobileNumber,
      service: feedback.service.name,
      rating: feedback.rating,
      videoUrl: feedback.selectedMedia,
    }

    const response = await addFeedback(payload)
    if (response) {
      showToast(ToastType.success, 'Feedback submitted successfully')
      setFeedback(initialFeedbackState)
    } else {
      showToast(ToastType.error, 'Failed to submit feedback')
    }
  }

  const renderServiceItem = ({ item }: { item: (typeof Service)[0] }) => {
    const isSelected = feedback.service?.id === item.id
    return (
      <TouchableOpacity
        style={[styles.serviceItem, isSelected && { backgroundColor: Colors.primary }]}
        onPress={() => onSelectService(item)}
      >
        <Text
          style={[
            CommonStylesFn.text(3.5, Colors.black, Fonts.medium),
            isSelected && { color: Colors.white },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <CommonHeader title={'Create Feedback'} />
      <View style={styles.container}>
        <View>
          <CommonTextInput
            label={'Name'}
            placeholder={'Enter Name'}
            value={feedback.name}
            onChangeText={(value) => onChangeText('name', value)}
          />
          <CommonTextInput
            label={'Mobile Number'}
            placeholder={'Enter Mobile Number'}
            value={feedback.mobileNumber}
            keyboardType={'number-pad'}
            maxLength={10}
            onChangeText={(value) => onChangeText('mobileNumber', value)}
          />
          <Text style={styles.serviceTitle}>{'Select Service'}</Text>
          <FlatList
            data={Service}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.serviceColumnWrapper}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.serviceContentContainer}
          />
          <StarRating
            rating={feedback.rating ?? 0}
            onRatingChange={onSelectRating}
            title={'Select Rating'}
          />
          <MediaCapture
            title={'Record Video'}
            selectedMedia={feedback.selectedMedia}
            onMediaSelected={onMediaSelected}
            quality={'high'}
            maxDuration={60}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            label={'Clear'}
            onPress={onPressClear}
            containerStyle={styles.cancelButton}
          />
          <CommonButton
            label={'Submit'}
            onPress={onPressSubmit}
            containerStyle={styles.submitButton}
          />
        </View>
      </View>
    </>
  )
}

export default CreateFeedBackScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
  },
  serviceTitle: {
    ...CommonStylesFn.text(3.5, Colors.primary, Fonts.medium),
    marginBottom: verticalScale(10),
  },
  serviceItem: {
    flex: 1,
    padding: scale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
    backgroundColor: Colors.accentLight,
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceContentContainer: {
    gap: verticalScale(10),
  },
  serviceColumnWrapper: {
    gap: scale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(20),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
    borderWidth: moderateScale(1),
  },
  submitButton: {
    flex: 1,
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
  },
})
