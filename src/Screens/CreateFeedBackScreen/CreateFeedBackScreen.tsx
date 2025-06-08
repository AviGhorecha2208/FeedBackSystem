import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { Colors } from '../../Utils/Colors'
import { goBack, navigate } from '../../Navigation/NavigationServices'
import CommonTextInput from '../../Components/CommonTextInput'
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive'
import { Screens, Service, ToastType } from '../../Utils/Const'
import { CommonStylesFn } from '../../Utils/CommonStyles'
import { Fonts } from '../../Utils/Fonts'
import StarRating from '../../Components/StarRating'
import MediaCapture from '../../Components/MediaCapture'
import { ImagePickerResponse } from 'react-native-image-picker'
import CommonButton from '../../Components/CommonButton'
import { getUniqueId, showToast } from '../../Utils/Utility'
import { useDispatch } from 'react-redux'
import { createFeedback } from '../../Store/Feedbacks'

interface Service {
  id: number
  name: string
}

interface Feedback {
  name: string | null
  mobileNumber: string | null
  Address: string | null
  feedback: string | null
  service: { id: number; name: string } | null
  rating: number | null
  selectedMedia: string | null
}

const initialFeedbackState: Feedback = {
  name: null,
  mobileNumber: null,
  Address: null,
  feedback: null,
  service: null,
  rating: null,
  selectedMedia: null,
}

const CreateFeedBackScreen = () => {
  const [feedback, setFeedback] = useState(initialFeedbackState)

  const dispatch = useDispatch()
  const onChangeText = (key: keyof typeof initialFeedbackState, value: string | null) => {
    setFeedback({ ...feedback, [key]: value })
  }

  const onBackPress = () => {
    goBack()
  }

  const onSelectService = (item: (typeof Service)[0]) => {
    setFeedback({ ...feedback, service: item })
  }

  const onSelectRating = (rating: number) => {
    setFeedback({ ...feedback, rating })
  }

  const onImageSelected = (response: ImagePickerResponse) => {
    if (response.assets && response.assets[0]) {
      setFeedback({ ...feedback, selectedMedia: response.assets[0].uri ?? null })
    }
  }

  const onPressCancel = () => {
    goBack()
  }

  const onPressSubmit = () => {
    if (
      !feedback.name ||
      !feedback.mobileNumber ||
      !feedback.Address ||
      !feedback.service ||
      !feedback.rating ||
      !feedback.selectedMedia
    ) {
      showToast(ToastType.error, 'Please fill all the fields')
      return
    } else {
      const newFeedback = { ...feedback, id: getUniqueId() }
      dispatch(createFeedback({ feedback: newFeedback }))
      navigate(Screens.PreviewFeedBack, { feedback: newFeedback, isFromCreate: true })
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

  const renderServices = () => {
    return (
      <>
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
      </>
    )
  }

  return (
    <>
      <CommonHeader title={'Create Feedback'} leftIcon={'arrow-left'} onLeftPress={onBackPress} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.subContainer}>
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
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={(value) => onChangeText('mobileNumber', value)}
          />
          <CommonTextInput
            label={'Address'}
            placeholder={'Enter Address'}
            value={feedback.Address}
            onChangeText={(value) => onChangeText('Address', value)}
          />
          {renderServices()}
          <StarRating rating={feedback.rating ?? 0} onRatingChange={onSelectRating} />
          <MediaCapture
            title={'Record Video'}
            selectedMedia={feedback.selectedMedia}
            onMediaSelected={onImageSelected}
            quality={'high'}
            maxDuration={60}
          />
          <View style={styles.buttonContainer}>
            <CommonButton
              label={'Cancel'}
              onPress={onPressCancel}
              containerStyle={styles.cancelButton}
            />
            <CommonButton
              label={'Submit'}
              onPress={onPressSubmit}
              containerStyle={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default CreateFeedBackScreen

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: Colors.background,
  },
  subContainer: {
    flex: 1,
    marginTop: verticalScale(20),
    width: '100%',
    paddingHorizontal: scale(16),
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
    marginTop: verticalScale(20),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
    borderWidth: moderateScale(1),
  },

  submitButton: {
    flex: 1,
  },
})
