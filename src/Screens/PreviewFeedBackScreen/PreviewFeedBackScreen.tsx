import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { Colors } from '../../Utils/Colors'
import { goBack, reset } from '../../Navigation/NavigationServices'
import CommonTextInput from '../../Components/CommonTextInput'
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive'
import { Screens, Service } from '../../Utils/Const'
import { CommonStylesFn } from '../../Utils/CommonStyles'
import { Fonts } from '../../Utils/Fonts'
import StarRating from '../../Components/StarRating'
import MediaCapture from '../../Components/MediaCapture'
import CommonButton from '../../Components/CommonButton'
import { RootStackParamList } from '../../Navigation/Navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface Service {
  id: number
  name: string
}

type PreviewFeedBackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  Screens.PreviewFeedBack
>

const PreviewFeedBackScreen = ({ route }: PreviewFeedBackScreenProps) => {
  const { feedback, isFromCreate } = route.params
  console.log(feedback, 'feedback')
  const onBackPress = () => {
    if (isFromCreate) {
      reset({
        index: 0,
        routes: [{ name: Screens.Dashboard }],
      })
    } else {
      goBack()
    }
  }

  const renderServiceItem = ({ item }: { item: (typeof Service)[0] }) => {
    const isSelected = feedback.service?.id === item.id
    return (
      <View style={[styles.serviceItem, isSelected && { backgroundColor: Colors.primary }]}>
        <Text
          style={[
            CommonStylesFn.text(3.5, Colors.black, Fonts.medium),
            isSelected && { color: Colors.white },
          ]}
        >
          {item.name}
        </Text>
      </View>
    )
  }

  const renderServices = () => {
    return (
      <View>
        <Text style={styles.serviceTitle}>{'Selected Service'}</Text>
        <FlatList
          data={Service}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.serviceColumnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.serviceContentContainer}
        />
      </View>
    )
  }

  return (
    <>
      <CommonHeader title={'Feedback Preview'} leftIcon={'arrow-left'} onLeftPress={onBackPress} />
      <View style={styles.container}>
        <View>
          <CommonTextInput label={'Name'} placeholder={'Enter Name'} value={feedback.name} />
          <CommonTextInput
            label={'Mobile Number'}
            placeholder={'Enter Mobile Number'}
            value={feedback.mobileNumber}
            keyboardType={'numeric'}
            maxLength={10}
          />
          {renderServices()}
          <StarRating rating={feedback.rating ?? 0} title={'Rating'} />
          <MediaCapture
            title={'Recorded Video'}
            disabled={true}
            selectedMedia={feedback.selectedMedia}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CommonButton
            label={isFromCreate ? 'Go To Dashboard' : 'Go Back'}
            onPress={onBackPress}
            containerStyle={styles.cancelButton}
          />
        </View>
      </View>
    </>
  )
}

export default PreviewFeedBackScreen

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
    marginTop: verticalScale(20),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    borderColor: Colors.primary,
    borderWidth: moderateScale(1),
  },
})
